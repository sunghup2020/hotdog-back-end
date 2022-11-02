import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation:{
        editComment:protectedResolver(async(_,{id,content},{loggedInUser})=>{
            const comment = await client.commentdb.findUnique({
                where:{
                    id
                },
                select:{
                    user_id:true
                }
            });
            if(!comment) {
               return{
                ok:false,
                error:"comment not found."
               }; 
            } else if (comment.user_id !== loggedInUser.id) {
                return {
                    ok:false,
                    error: "Not authorized."
                };
            } else {
                await client.commentdb.update({
                    where:{
                        id
                    },
                    data:{
                        content
                    }
                });
                return {
                    ok:true
                };
            }
        })
    }
}