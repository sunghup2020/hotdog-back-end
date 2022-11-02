import client from "../../client"

export default {
    Mutation: {
        createComment: async(_,{post_id,content},{loggedInUser})=>{
            const ok = await client.postdb.findUnique({
                where:{
                    id:post_id
                },
                select:{
                    id:true
                }
            });
            if(!ok){
                return {
                    ok:false,
                    error:"post not found"
                }
            }
            await client.commentdb.create({
                data:{
                    content,
                    postdb:{
                        connect:{
                            id:post_id
                        }
                    },
                    userdb:{
                        connect:{
                            id:loggedInUser.id
                        }
                    }
                }
            });
            return {
                ok:true
            }
        }
    }
}