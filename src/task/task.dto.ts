import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsEnum, IsString } from "class-validator";
import { Priority } from "prisma/generated/client";

export class TaskDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => String(value).toLowerCase())
  priority?: Priority;
}


