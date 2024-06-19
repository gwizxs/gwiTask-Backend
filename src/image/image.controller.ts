import {  Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import { ImageFileDto } from './image.dto';

@Controller('image')
export class ImageController {
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(__dirname, '../../../uploads/', 'uploads'),
        filename: (req, file, cb) => {
          const uniqueFilename = `${uuidv4()}-${file.originalname}`;
          cb(null, uniqueFilename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ImageFileDto> {
    const uploadDate = new Date();
    const imageFile: ImageFileDto = {
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      uploadDate,
    };
    // Consider saving imageFile to a database for better management
    return imageFile;
  }
  @Get('/getFile')
  getFile(@Res() res: Response, @Query('fileName') fileName: string) {
      const filePath = path.join(__dirname, '../../../uploads/', fileName);
      res.sendFile(filePath);
  }
  
}
