import client from "../../client"

export default {
    Query:{
        seePostComment: (_,{id})=>
            client.commentdb.findMany({
                where:{
                    post_id:id
                }
            })
        }
    };
