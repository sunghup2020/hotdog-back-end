import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async(_, { user_id, user_pw }) => {
            const user = await client.userdb.findFirst({where: {user_id}});
            if(!user){
                return {
                    ok: false,
                    error: "해당 아이디는 존재하지 않는 아이디입니다."
                };
            }
            const passwordOk = await bcrypt.compare(user_pw, user.user_pw);
            if(!passwordOk){
                return{
                    ok: false,
                    error: "잘못된 비밀번호입니다."
                };
            }
            const token = await jwt.sign({user_id: user.user_id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
        },
    },
};