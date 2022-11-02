import client from "../../client"

export default {
    Query: {
        seePetProfile: (_, { user_id }) =>
            client.petdb.findFirst({
                where: {
                    user_id,
                },
            }),
    },
};