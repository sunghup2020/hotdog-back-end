import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
});

export const uploadToS3 = async (file, user_id, folderName) => {
    const {filename,createReadStream} = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${user_id}-${Date.now()}-${filename}`;
    const {Location} = await new AWS.S3().upload({
        Bucket: "hot-dog",
        Key: objectName,
        ACL: "public-read",
        Body: readStream
    }).promise();
    return Location;
} 