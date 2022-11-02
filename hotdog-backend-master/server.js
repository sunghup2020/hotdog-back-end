require("dotenv").config();
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from "http";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import {typeDefs, resolvers} from "./schema";
import { getUser } from './users/users.utils';
import pubsub from "./pubsub";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';



const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT;
async function startServer() {
  const server = new ApolloServer({
    schema,
    context: async (ctx) => {
      if(ctx.req){
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
          csrfPrevention: true,
          cache: 'bounded', 
      };
    }// } else {
        // console.log(ctx);
        // return {
        //   loggedInUser: context.loggedInUser
        // };
      // }
    },
    
    plugins: [
      
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const getDynamicContext = async (ctx, msg, args) => {
    // ctx is the graphql-ws Context where connectionParams live
   if (ctx.connectionParams.token) {
      const loggedInUSer = await getUser(ctx.connectionParams.token);
      return { loggedInUSer };
    }
    // Otherwise let our resolvers know we don't have a current user
    return { currentUser: null };
  };

  const serverCleanup = useServer({ schema, onConnect: async ({connectionParams}) => {
    // Check authentication every time a client connects.
    console.log(connectionParams);
    if (!connectionParams.token) {
      // You can return false to close the connection  or throw an explicit error
      throw new Error('Auth token missing!');
    }
    const loggedInUser = await getUser(connectionParams.token);
    return {loggedInUser};
  },
  context: (ctx, msg, args) => {
    // Returning an object will add that information to our
    // GraphQL context, which all of our resolvers have access to.
   return getDynamicContext(ctx, msg, args);
 },
  }, wsServer);

  await server.start();


  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  
  server.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));
  
  
  
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
  // await new Promise(r => httpServer.listen(PORT, r));

  // console.log(`http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();
