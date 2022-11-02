import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectedResolver(async(_, {id}, {loggedInUser}) => {
            const message = await client.chatmessagedb.findFirst({
                where: {
                    id,
                    user_id: {
                        not: loggedInUser.id,
                    },
                    chatroomdb: {
                        userdb: {
                            some: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                },
            });
            if(!message) {
                return {
                    ok: false,
                    error: "Message not found."
                };
            }
            await client.chatmessagedb.update({
                where: {
                    id,
                },
                data: {
                    read: true,
                },
            });
            return {
                ok: true,
            };
        }),
    },
}