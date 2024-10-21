import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MinLength(3, { message: 'Username is too short' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  password: string;
}
