import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signUp(CreateUserDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
