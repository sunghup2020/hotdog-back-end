import { gql } from "apollo-server-express";

export default gql`
    type commentdb{
        id:Int!
        userdb:userdb
        postdb:postdb!
        content:String!
        isMine:Boolean!
    }
`;