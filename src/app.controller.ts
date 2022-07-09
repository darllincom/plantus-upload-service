import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Query('bucketName') bucketName: string,
    @Query('keyTo') keyTo: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.service.uploadImage(
      image.buffer,
      image.originalname,
      bucketName,
      keyTo,
    );
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Query('bucketName') bucketName: string,
    @Query('keyTo') keyTo: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.uploadFile(
      file.buffer,
      file.originalname,
      bucketName,
      keyTo,
    );
  }
}
