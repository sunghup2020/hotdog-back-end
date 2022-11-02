import { gql } from "apollo-server";

export default gql`
    type Query {
        seeProfile(user_name:String!): userdb
    }
`;