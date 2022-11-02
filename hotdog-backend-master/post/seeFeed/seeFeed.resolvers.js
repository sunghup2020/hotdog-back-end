import client from "../../client"

export default {
    Query:{
        seeFeed: (_,{offset, id}) => client.postdb.findMany({
            take:2,
            skip:offset,
            where:{
                id
            },
            orderBy:{
                id:"desc"
            }
        })
    }
}