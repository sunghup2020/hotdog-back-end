import { gql } from "apollo-server-express";

export default gql`
    type chatmessagedb {
        id: Int!
        content: String!
        read: Boolean!
        userdb: userdb!
        chatroomdb: chatroomdb!
        message_send_date: String!
    }
    type chatroomdb {
        id: Int!
        unreadTotal: Int!
        userdb: [userdb]
        chatmessagedb: [chatmessagedb]
    }
`;  