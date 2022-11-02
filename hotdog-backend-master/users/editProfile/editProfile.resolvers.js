import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        editProfile: async (_, {
            user_pw:newPassword,
            user_name,
            user_birth,
            user_gender,
            user_phone,
            user_address,
        },{loggedInUser}) => {
            let uglyPassword = null;
            if(newPassword){
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.userdb.update({where:{
                user_id: loggedInUser.user_id
            }, data:{
                user_name,
                ...(uglyPassword && {user_pw: uglyPassword}),
            },
        });
        if(updatedUser.id){
            return {
                ok:true,
            }
        } else {
            return {
                ok:false,
                error: "수정 실패"
            }
        }
        },
    },
};