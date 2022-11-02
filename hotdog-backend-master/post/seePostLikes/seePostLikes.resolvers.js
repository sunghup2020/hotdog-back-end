import client from "../../client"

export default {
    Query:{
        seePostLikes:async(_,{id})=>{
            const likes = await client.likesdb.findMany({
                where:{
                    post_id:id
                },
                select:{
                    userdb:true
                }
            });
            return likes.map((likesdb) => likesdb.userdb); 
        }
    }
}