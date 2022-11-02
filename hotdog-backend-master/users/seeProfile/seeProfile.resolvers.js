import client from "../../client"

export default {
    Query: {
        seeProfile: (_, { user_name }) =>
            client.userdb.findUnique({
                where: {
                    user_name,
                },
            }),
    },
};