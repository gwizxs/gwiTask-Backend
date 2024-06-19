import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ImageFileDto } from './image.dto';

@Injectable()
export class ImageService {
  async uploadFile(file: Express.Multer.File): Promise<ImageFileDto> {
    const uploadDate = new Date();
    const imageFile: ImageFileDto = {
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      uploadDate,
    };
    return imageFile;
  }

  getFile(fileName: string): string {
    return path.join(__dirname, '../../../uploads/', fileName);
  }
}
