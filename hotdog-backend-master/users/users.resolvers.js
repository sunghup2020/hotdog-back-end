import client from "../client";

export default {
    userdb: {
        postdb: ({id}) => client.userdb.findUnique({where:{id}}).postdb()
    }
}