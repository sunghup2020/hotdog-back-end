export default {
    commentdb:{
        isMine: ({user_id},_,{loggedInUser}) => {
            if(!loggedInUser) {
                return false;
            }
            return user_id === loggedInUser.id;
        }
    }
}