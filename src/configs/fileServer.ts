import { S3Client } from '@aws-sdk/client-s3';
import { S3_Config } from './config';

const s3Client = new S3Client({
  endpoint: S3_Config.S3_ENDPOINT,
  region: S3_Config.region,
  credentials: {
    accessKeyId: S3_Config.accessKeyId,
    secretAccessKey: S3_Config.secretAccessKey,
  },
  forcePathStyle: true,
});

export { s3Client };
