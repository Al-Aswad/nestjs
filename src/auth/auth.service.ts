import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { KelasService } from 'src/kelas/kelas.service';
import { Siswa } from 'src/siswa/entities/siswa.entity';
import { SiswaService } from 'src/siswa/siswa.service';
import { NotFoundException } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';

import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly siswaService: SiswaService,
  ) {}

  async login(LoginDto: LoginDto) {
    const siswa = await this.siswaService.validateUser(LoginDto.email);

    if (!siswa) {
      throw new NotFoundException('user not found');
    }

    if (await this.validatePassword(LoginDto.password, siswa.password)) {
      return {
        access_token: await this.createAccessToken(await siswa),
      };
    }

    throw new NotFoundException('password not match');
  }

  async me(token: string) {
    const decoded = await this.decodeToken(token);
    const siswa = await this.siswaService.findOne(decoded.sub);
    return siswa;
  }

  async createAccessToken(siswa: Siswa): Promise<string> {
    const payload = {
      sub: siswa.id,
      roles: ['user'],
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
