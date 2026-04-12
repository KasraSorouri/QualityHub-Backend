import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../../../configs/fileServer';
import { v4 as uuidv4 } from 'uuid';
import { NokImage } from '../../../models';

// Upload NOK Images to S3 and Database
const uploadNokImages = async (
  files: Express.Multer.File[],
  nokId: number,
  qualityStatus: string,
  nokCode: number,
  station: number,
  userId: number,
): Promise<NokImage[] | void> => {
  try {
    const uploadPromises = files.map(async (file) => {
      const fileName = `${uuidv4()}_${file.originalname}`;
      const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload to S3
      await s3Client.send(new PutObjectCommand(uploadParams));

      const getCommand = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
      });

      const presignedUrl = await getSignedUrl(s3Client, getCommand, {
        expiresIn: 24 * 3600,
      });

      // Save to database
      const savedFile = await NokImage.create({
        fileName: fileName,
        filePath: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
        fileSize: file.size,
        nokId: nokId,
        qualityStatus: qualityStatus === 'OK' ? 'OK' : 'NOK',
        nokCodeId: nokCode,
        stationId: station,
        contentType: file.mimetype,
        uploadedBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      savedFile.setDataValue('filePath', presignedUrl);

      return savedFile;
    });

    const savedFiles = await Promise.all(uploadPromises);
    return savedFiles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error uploading files: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during file upload');
    }
  }
};

// Get NOK Images from Database
const getNokImages = async (nokId: number): Promise<NokImage[]> => {
  try {
    const images = await NokImage.findAll({
      where: {
        nokId: nokId,
      },
      raw: true,
    });
    await Promise.all(
      images.map(async (image) => {
        const getCommand = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: image.fileName,
        });
        const preSignedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 24 * 3600 });
        image.filePath = preSignedUrl;
      }),
    );
    return images;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching images: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching images');
    }
  }
};

export default {
  uploadNokImages,
  getNokImages,
};
