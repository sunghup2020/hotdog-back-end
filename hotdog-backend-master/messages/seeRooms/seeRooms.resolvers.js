import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRooms: protectedResolver(async (_, __, { loggedInUser }) => 
            client.chatroomdb.findMany({
                where: {
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