import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Токен із заголовка Authorization
      ignoreExpiration: false, // Не ігноруємо строк дії токена
      secretOrKey: 'torubka', // Використовуємо той самий ключ
    });
  }

  async validate(payload: any) {
    // Повертаємо інформацію про користувача, яка додається в req.user
    return { userId: payload.sub, email: payload.email };
  }
}
