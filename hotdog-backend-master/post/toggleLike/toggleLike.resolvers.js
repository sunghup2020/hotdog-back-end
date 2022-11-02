import client from "../../client"

export default {
    Mutation: {
        toggleLike: async(_, {id}, {loggedInUser}) => {
            const ok = await client.postdb.findUnique({
                where:{
                    id
                }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Post not found"
                };
            }
            const like = await client.likesdb.findUnique({
                    where:{
                        user_id_post_id: {
                            user_id: loggedInUser.id,
                            post_id: id
                        }
                }
            });
            if(like) {
                await client.likesdb.delete({
                    where:{
                        user_id_post_id: {
                            user_id: loggedInUser.id,
                            post_id: id
                        }
                }
                });
            } else {
                await client.likesdb.create({
                    data:{
                        userdb: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        postdb: {
                            connect: {
                                id: ok.id
                            }
                        }
                    }
                });
            }
            return {
                ok:true
            }
        }
    }
}