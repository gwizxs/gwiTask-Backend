import { Body,
  Controller,
   HttpCode,
    UsePipes,
     ValidationPipe,
      Post, 
      Res,
      UnauthorizedException,
      Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
 constructor(private readonly authService: AuthService) {}


@UsePipes(new ValidationPipe())
@HttpCode(200)
@Post('login')
async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response ) {
 const {refreshToken, ...response} = await this.authService.login(dto); 
 this.authService.addRefreshTokenToRes(res, refreshToken)

 return response
}

@UsePipes(new ValidationPipe())
@HttpCode(200)
@Post('register')
async register(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response ) {
 const {refreshToken, ...response} = await this.authService.register(dto); 
 this.authService.addRefreshTokenToRes(res, refreshToken)

 return response
}


@HttpCode(200)
@Post('login/access-token')
async getNewTokens(
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response
) {
  const refreshTokenFromCookie = 
  req.cookies[this.authService.REFRESH_TOKEN_NAME]

  if (!refreshTokenFromCookie) {
    this.authService.RemoveRefreshTokenFromRes(res)
    throw new UnauthorizedException('токен не передан')
  }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookie
    )

    this.authService.addRefreshTokenToRes(res, refreshToken)

    return response
  

}


@HttpCode(200)
@Post('logout')
async logout(@Res({passthrough: true}) res: Response ) {

 this.authService.RemoveRefreshTokenFromRes(res)

 return true
}
}