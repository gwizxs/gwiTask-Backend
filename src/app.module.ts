import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, UserModule, TaskModule, TimeBlockModule, ImageModule ],
})
export class AppModule {}
