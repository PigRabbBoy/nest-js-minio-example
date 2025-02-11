import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AppService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
    },
    region: 'REGION',
    endpoint: 'xxxxx',
    forcePathStyle: true,
  });
  async getPreSignedURL(bucketName: string, key: string, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: contentType,
        ACL: 'public-read',
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn: 1800 });
    } catch (error) {
      throw error;
    }
  }
}
