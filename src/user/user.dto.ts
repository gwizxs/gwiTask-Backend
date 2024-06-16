import { IsNumber, IsOptional, Max, Min, IsEmail, MinLength, IsString } from "class-validator";

export class PomodoroSettingsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    IntervalsCount?: number;
}

export class UserDto extends PomodoroSettingsDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    @MinLength(8, {
        message: 'пароль не может быть короче 8 символов'
    })
    @IsString()
    password: string;
}
