import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRoom: protectedResolver((_, { id }, { loggedInUser }) => 
            client.chatroomdb.findFirst({
                where: {
                    id,
                    userdb: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            })
        ),
    },
};