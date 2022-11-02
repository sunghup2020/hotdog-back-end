import client from "../../client"

export default {
    Mutation: {
        editPost: async(_, {id, post_content}, {loggedInUser}) => {
            const ok = await client.postdb.findFirst({
                where: {
                    id,
                    user_id: loggedInUser.id
                }
            });
            if(!ok) {
                return {
                    ok: false,
                    error: "Post not found."
                };
            }
            const post = await client.postdb.update({
                where: {
                    id
                },
                data: {
                    post_content
                }
            });
            return {
                ok:true
            };
        }
    }
}