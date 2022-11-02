import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        editPost(id: Int!, post_content: String!): MutationResponse!
    }
`;