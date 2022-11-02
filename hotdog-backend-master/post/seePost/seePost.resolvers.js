import client from "../../client"

export default {
    Query: {
        seePost: (_, {id}) =>
        client.postdb.findUnique({
            where: {
                id 
            }
        })
    }
}