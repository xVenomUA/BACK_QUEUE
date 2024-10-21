import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MinLength(3, { message: 'Username is too short' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  password?: string;
}
