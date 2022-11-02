import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectedResolver(async (_, { content, chatroom_id, user_id }, { loggedInUser }) => {
            let room = null;
            if(user_id) {
                const user = await client.userdb.findUnique({
                    where: {
                        id: user_id,
                    },
                    select: {
                        id: true,
                    },
                });
                if(!user) {
                    return {
                        ok: false,
                        error: "This user does not exist.",
                    }; 
                }
                room = await client.chatroomdb.create({
                    data: {
                        userdb: {
                            connect: [
                                {
                                    id: user_id,
                                },
                                {
                                    id: loggedInUser.id,
                                },
                            ],
                        },
                    },
                });
            } else if(chatroom_id) {
                room = await client.chatroomdb.findUnique({
                    where: {
                        id: chatroom_id,
                    },
                    select: {
                        id: true,
                    },
                });
                if(!room) {
                    return {
                        ok: false,
                        error: "Room not found.",
                    };
                }
            }
            const message = await client.chatmessagedb.create({
                data: {
                    content,
                    chatroomdb: {
                        connect: {
                            id: room.id,
                        },
                    },
                    userdb: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                },
            });
            pubsub.publish(NEW_MESSAGE,{roomUpdates:{...message}})
            return {
                ok: true,
                id: message.id,
            };
        }),
    },
};