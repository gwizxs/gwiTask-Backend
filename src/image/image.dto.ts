import { IsString, IsNumber, IsDate } from 'class-validator';

export class ImageFileDto {
  @IsString()
  fileName: string;

  @IsString()
  originalName: string;

  @IsNumber()
  size: number;

  @IsDate()
  uploadDate: Date;
}
