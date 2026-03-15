import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URI: string | undefined =
  process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URI : process.env.DATABASE_URI;

const SECRET = 'secret*secret*secret';

// FileServer
const S3_ENDPOINT: string = process.env.S3_ENDPOINT || 'localhost:9000';
const S3_ACCESS_KEY: string = process.env.S3_ACCESS_KEY || 'admin';
const S3_SECRET_KEY: string = process.env.S3_SECRET_KEY || 'password';
const S3_REGION: string = process.env.S3_REGION || 'us-east-1';
const S3_BUCKET_NAME: string = process.env.S3_BUCKET_NAME || 'q-insight';
const S3_Config = {
  S3_ENDPOINT: S3_ENDPOINT,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: S3_REGION,
  bucketName: S3_BUCKET_NAME,
};

const MAX_Attachment_Size: number = 50;

export { DATABASE_URI, PORT, SECRET, S3_Config, MAX_Attachment_Size };
