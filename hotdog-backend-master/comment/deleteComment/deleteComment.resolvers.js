import client from "../../client"

export default {
    Mutation:{
        deleteComment: async(_,{id},{loggedInUser})=>{
            const comment = await client.commentdb.findUnique({
                where:{
                    id
                },
                select:{
                    user_id:true
                }
            });
            if(!comment){
                return{
                    ok:false,
                    error:"Comment not found."
                }
            } else if (comment.user_id !== loggedInUser.id) {
                return {
                    ok:false,
                    error:"Not authorized."
                }
            } else {
                await client.commentdb.delete({
                    where:{
                        id
                    }
                });
                return {
                    ok:true
                }
            }
        }
    }
}