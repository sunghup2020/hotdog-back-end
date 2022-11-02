import client from "../client";

export default {
    postdb: {
        userdb: ({user_id}) => {
            return client.userdb.findUnique({where:{id:user_id}});
        },
        post_likes_cnt: ({id}) => client.likesdb.count({where:{post_id:id}}),
        post_comments_cnt: ({id}) => client.commentdb.count({where:{post_id:id}}),
        isMine: ({user_id},_,{loggedInUser}) => {
            if(!loggedInUser) {
                return false;
            }
            return user_id === loggedInUser.id;
        },
        isLiked: async ({ id }, _, { loggedInUser }) => {
			if (!loggedInUser) {
				return false;
			}
			const ok = await client.likesdb.findUnique({
				where: {
					user_id_post_id: {
						user_id: loggedInUser.id,
						post_id: id,
					},
				},
				select: {
					id: true,
				},
			});
			if (ok) {
				return true;
			}
			return false;
		},
    }
};