import client from "../../client"

export default {
    Mutation: {
        deletePost: async(_,{id},{loggedInUser}) => {
            const post = await client.postdb.findUnique({
                where:{
                    id
                },
                select:{
                    user_id:true
                }
            });
            if(!post) {
                return {
                    ok:false,
                    error:"post not found."
                }
            } else if (post.user_id !== loggedInUser.id) {
                return {
                    ok:false,
                    error:"Not authorized."
                }
            } else {
                await client.postdb.delete({
                    where:{
                        id
                    }
                });
                return {
                    ok:true
                }
            };

        }
    }
}