import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NotFoundError } from '../exceptions/NotFoundError';
import { URL } from '../types/TypeAliases';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
dotenv.config();

class S3Service {
  private client: S3Client;
  private bucketName;

  constructor() {
    const { S3_ACCESSKEYID, S3_SECRETACCESSKEY, S3_ENDPOINT } = process.env;
    if (S3_ACCESSKEYID && S3_SECRETACCESSKEY) {
      this.client = new S3Client({
        region: 'default',
        endpoint: S3_ENDPOINT,
        credentials: {
          accessKeyId: S3_ACCESSKEYID,
          secretAccessKey: S3_SECRETACCESSKEY,
        },
      });
    } else throw new NotFoundError('S3 keys not found.');

    this.bucketName = process.env.S3_BUCKETNAME;
  }
  
  async generatePutPresignedUrl(keyName: string, expiresIn = 300): Promise<URL> {
    const putCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: keyName
    });

    return getSignedUrl(this.client, putCommand, { expiresIn });
  }

  async generateGetPresignedUrl(keyName: string | null, expiresIn = 300): Promise<URL | null> {
    if (!keyName) return null;

    const getCommand = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: keyName
    });

    return getSignedUrl(this.client, getCommand, { expiresIn });
  }  
}

export default new S3Service();