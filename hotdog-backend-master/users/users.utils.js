import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
    try {
        if(!token){
            return null;
        }
        const { user_id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.userdb.findUnique({ where: { user_id } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export function protectedResolver(ourResolver) {
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            const query = info.operation.operation === "query";
            if(query){
                return null;
            } else {
                return {
                    ok: false,
                    error: "Please log in to perform this action."
                };
            }
        }
        return ourResolver(root, args, context, info);
    };
}