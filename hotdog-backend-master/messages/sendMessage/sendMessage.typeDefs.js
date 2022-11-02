import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        sendMessage(content: String!, chatroom_id: Int, user_id: Int): MutationResponse!
    }
`;