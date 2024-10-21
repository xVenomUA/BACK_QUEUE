import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: CreateUserDto): Promise<User> {
    await this.isUserExist(registerUserDto.email);
    const { username, password, email } = registerUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    return this.userRepository.save(user);
  }

  async updateUser(updateUser: UpdateUserDto, currentUser: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.userId },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (updateUser.email !== user.email) {
      await this.isUserExist(updateUser.email);
    }
    user.username = updateUser.username;
    user.email = updateUser.email;
    if (updateUser.password) {
      user.password = updateUser.password;
    }
    await this.userRepository.update({ id: currentUser.userId }, user);
    return this.userRepository.findOne({ where: { id: currentUser.userId } });
  }

  async find(currentUser: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.userId },
    });
    user.password = undefined;
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async isUserExist(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', 409);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
