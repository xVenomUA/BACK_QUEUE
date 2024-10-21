import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('Email or password is incorrect', 401);
    }
    const isPasswordMatch = await this.userService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('Email or password is incorrect', 401);
    }

    user.password = undefined;
    const access_token = this.generateToken(user);

    return { user, access_token: access_token.access_token };
  }

  async signUp(signInDto: CreateUserDto) {
    const user = await this.userService.create(signInDto);
    user.password = undefined;
    const access_token = this.generateToken(user);
    return {
      user,
      access_token: access_token.access_token,
    };
  }
}
