import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream } from 'fs';

const s3 = new S3Client({ region: process.env.REGION });

const uploadToS3 = (filePath, key, bucket) => {
   const fileStream = createReadStream(filePath);
   const upload = new Upload({
      client: s3,
      queueSize: 4,
      leavePartsOnError: false,
      params: {
         Bucket: bucket,
         Key: key,
         Body: fileStream,
      },
   });
   return upload.done(); // Return the Promise that resolves when the upload is complete
};

const getFromS3 = (key, bucket) => {
   return new Promise(async (resolve, reject) => {
      try {
         // Create a GetObjectCommand to fetch the object
         const getObjectParams = {
            Bucket: bucket,
            Key: key,
         };

         const getObjectCommand = new GetObjectCommand(getObjectParams);

         // Send the GetObjectCommand to S3 using the client
         const response = await s3.send(getObjectCommand);

         // Create a Readable stream from the response Body
         const fileStream = Readable.from(response.Body);

         resolve(fileStream);
      } catch (err) {
         reject(err);
      }
   });
};

const getFromS3WithMetadata = (key, bucket) => {
   return new Promise(async (resolve, reject) => {
      try {
         // Create a GetObjectCommand to fetch the object
         const getObjectParams = {
            Bucket: bucket,
            Key: key,
         };

         const getObjectCommand = new GetObjectCommand(getObjectParams);

         // Send the GetObjectCommand to S3 using the client
         const response = await s3.send(getObjectCommand);
         let metaData = response.Metadata.algorithm;
         // Create a Readable stream from the response Body
         const fileStream = Readable.from(response.Body);

         resolve({ fileStream, metaData });
      } catch (err) {
         reject(err);
      }
   });
};

export default {
   uploadToS3,
   getFromS3,
   getFromS3WithMetadata,
};
