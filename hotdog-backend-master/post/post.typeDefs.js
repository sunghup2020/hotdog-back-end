import { gql } from "apollo-server-express";

export default gql`
    type postdb {
        id: Int!
        post_content: String
        post_images: String!
        post_likes_cnt: Int!
        post_comments_cnt: Int!
        userdb: userdb!
        isMine:Boolean!
        isLiked: Boolean!
    }
    type likesdb {
        id: Int!
        postdb: postdb!
    }
`