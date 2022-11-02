import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        uploadPost(post_images: Upload!, post_content: String): postdb
    }
`;