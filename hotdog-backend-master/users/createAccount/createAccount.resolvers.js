import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
        createAccount: async (_, {
            user_id, 
            user_pw,
            user_name,
            user_birth,
            user_gender,
            user_phone,
            user_address,
        }) => {
            try{
                const existingUserId = await client.userdb.findFirst({
                    where: {
                        OR: [
                            {
                                user_id
                            },
                            {
                                user_name
                            }
                        ]
                    }
                });
                if(existingUserId){
                    throw new Error("이 아이디/닉네임은 이미 존재하는 아이디/닉네임입니다.");
                }

                const uglyPassword = await bcrypt.hash(user_pw, 10);
            
                const user = await client.userdb.create({
                    data: {
                        user_id,
                        user_pw: uglyPassword,
                        user_address,
                        user_birth,
                        user_gender,
                        user_name,
                        user_phone
                    },
                });
                return {
                    ok:true
                };
            } catch(e) {
                return e;
            }         
        },
    },
};