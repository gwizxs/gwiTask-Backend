import { Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ImageFileDto } from './image.dto';

const uploadFolder = path.join(__dirname, '../../../uploads/');

// Создаём папку, если её нет
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

@Controller('image')
export class ImageController {
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadFolder,
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
    return imageFile;
  }

  @Get('/getFile')
  getFile(@Res() res: Response, @Query('fileName') fileName: string) {
    const filePath = path.join(uploadFolder, fileName);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  }
}
