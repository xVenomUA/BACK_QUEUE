import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(4, { message: 'Password is too short' })
  password: string;
}
