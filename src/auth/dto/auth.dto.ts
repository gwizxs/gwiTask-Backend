import { IsEmail, MinLength, IsString } from 'class-validator';


export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(8, {
        message: 'пароль не может быть короче 8 символов'
    })
    @IsString()
    password: string;
}