import fs from "fs";
import client from "../client";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { uploadToS3 } from "../shared/shared.utils";

let a = 108

export default {
    Upload:GraphQLUpload,
    Mutation: {
        createPet: async (_, {
            user_id,
            pet_name,
            pet_age,
            pet_gender,
            pet_kinds,
            pet_image,
        }) => {
            let pet_image_url = null;
            if(pet_image){
                pet_image_url = await uploadToS3(pet_image, "pet");
                a += 1
                // const {filename, createReadStream} = await pet_image;
                // const newFilename = `${user_id}-${Date.now()}-${filename}`;
                // const stream = createReadStream();
                // const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + newFilename);
                // stream.pipe(writeStream);
                // pet_image_url = `http://localhost:4000/static/${newFilename}`;
            }
            await client.petdb.create({
                data: {
                    user_id:a,
                    pet_name,
                    pet_age,
                    pet_gender,
                    pet_kinds,
                    ...(pet_image_url && {pet_image: pet_image_url})
                },
            });
            return {
                ok:true
            }
        }
    }
};