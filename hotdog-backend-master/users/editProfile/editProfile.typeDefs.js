import {gql} from "apollo-server";

export default gql`
    type Mutation {
        editProfile(
            user_id: String
            user_pw: String
            user_name: String
            user_birth: String
            user_gender: String
            user_phone: String
            user_address: String
        ): MutationResponse!
    }
`

