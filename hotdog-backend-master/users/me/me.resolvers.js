import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) =>
      client.userdb.findUnique({
        where: {
          id: loggedInUser.id,
        },
      })
    ),
  },
};