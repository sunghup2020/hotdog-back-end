import client from "../client";

export default {
    chatroomdb: {
        userdb: ({ id }) => client.chatroomdb.findUnique({ where: { id } }).userdb(),
        chatmessagedb: ({ id }) => 
            client.chatmessagedb.findMany({
                where: {
                    chatroom_id: id,
                },
            }),
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if(!loggedInUser) {
                return 0;
            }
            return client.chatmessagedb.count({
                where: {
                    read: false,
                    chatroom_id: id,
                    userdb: {
                        id: {
                            not: loggedInUser.id,
                        },
                    },  
                },
            });
        }
    },
    chatmessagedb: {
        userdb: ({id}) => client.chatmessagedb.findUnique({where:{id}}).userdb()
    }
};