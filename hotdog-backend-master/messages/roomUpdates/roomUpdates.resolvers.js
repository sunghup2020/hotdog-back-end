import { withFilter } from "graphql-subscriptions";
import { argsToArgsConfig } from "graphql/type/definition";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async(root,args,context,info) => {
                const room = await client.chatroomdb.findFirst({
                    where:{
                        id:args.id,
                        userdb: {
                            some: {
                                id: context.loggedInUSer.id
                            }
                        }
                    },
                    select:{
                        id:true
                    }
                });
                if(!room){
                    throw new Error("You shall not see this.");
                }
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({roomUpdates}, {id}, {loggedInUSer}) => {
                        const room = await client.chatroomdb.findFirst({
                            where:{
                                id,
                                userdb: {
                                    some: {
                                        id: loggedInUSer.id
                                    }
                                }
                            },
                            select:{
                                id:true
                            }
                        });
                        if(!room){
                            return false;
                        }
                        return true;
                    }
                )(root,args,context,info);
            }
        }
    }
};