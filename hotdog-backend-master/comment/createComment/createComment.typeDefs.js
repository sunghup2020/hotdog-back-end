import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        createComment(post_id:Int!,content:String!):MutationResponse!
    }
`;