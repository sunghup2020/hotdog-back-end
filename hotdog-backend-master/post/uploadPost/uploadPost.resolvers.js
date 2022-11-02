import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        uploadPost: async (_, {
            post_images, post_content
        }, {loggedInUser}) => {
            const post_images_url = await uploadToS3(post_images, loggedInUser.id, "post");
            return client.postdb.create({
                data: {
                    post_images: post_images_url, post_content,
                    userdb: {
                        connect: {
                            id: loggedInUser.id
                        }
                    }
                }         
        })  
        }
    }
}