import { Body, Controller, HttpCode, Put, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';


@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Get()
@Auth()
async profile(@CurrentUser('id') id: string) {
  return this.userService.getProfile(id)
}

@UsePipes(new ValidationPipe())
@HttpCode(200)
@Put()
@Auth()
async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
  return this.userService.update(id, dto)
}

}
