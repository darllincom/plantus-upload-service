import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  async uploadImage(
    dataBuffer: Buffer,
    fileName: string,
    bucketName: string,
    keyTo: string,
  ) {
    const s3 = new S3();

    const uploadedImage = await s3
      .upload({
        Bucket: bucketName,
        Body: dataBuffer,
        Key: `${keyTo}/${randomUUID()}-${fileName}`,
        ContentType: 'image/jpg',
      })
      .promise();

    return uploadedImage;
  }

  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
    bucketName: string,
    keyTo: string,
  ) {
    const s3 = new S3();

    const uploadedFile = await s3
      .upload({
        Bucket: bucketName,
        Body: dataBuffer,
        Key: `${keyTo}/${randomUUID()}-${fileName}`,
        ContentType: 'application/pdf',
        ContentDisposition: 'inline',
      })
      .promise();

    return uploadedFile;
  }
}
