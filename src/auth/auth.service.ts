import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';

import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.userService.validateUser(LoginDto.email);

    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (await this.validatePassword(LoginDto.password, user.password)) {
      return {
        access_token: await this.createAccessToken(await user),
      };
    }

    throw new NotFoundException('password not match');
  }

  async me(token: string) {
    const decoded = await this.decodeToken(token);
    const user = await this.userService.findOne(decoded.sub);
    return user;
  }

  async createAccessToken(user: Users): Promise<string> {
    const payload = {
      sub: user.id,
      roles: [user.role.name],
    };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async validatePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, passwordHash);
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('token expired');
      } else {
        throw new InternalServerErrorException('token invalid');
      }
    }
  }
}
