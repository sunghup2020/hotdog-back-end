import { gql } from "apollo-server-express";

export default gql`
    scalar Upload
    type petdb {
        id: Int!
        user_id: Int!
        pet_name: String!
        pet_age: Int!
        pet_gender: String!
        pet_kinds: String!
        pet_image: String!
    }
    type Mutation {
        createPet(
            user_id: Int
            pet_name: String!
            pet_age: String!
            pet_gender: String!
            pet_kinds: String!
            pet_image: Upload!
        ): MutationResponse!
    }
`;