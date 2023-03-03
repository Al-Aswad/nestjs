import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { KelasService } from 'src/kelas/kelas.service';
import { Siswa } from 'src/siswa/entities/siswa.entity';
import { SiswaService } from 'src/siswa/siswa.service';
import { NotFoundException } from '@nestjs/common';

import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly siswaService: SiswaService,
  ) {}

  async login(LoginDto: LoginDto) {
    const siswa = this.siswaService.validateUser(LoginDto.email);

    if (!siswa) {
      throw new NotFoundException('user not found');
    }

    if (await this.validatePassword(LoginDto.password)) {
      return await this.createAccessToken(await siswa);
    }

    throw new NotFoundException('password not match');
  }

  hashPassword(password: string) {
    return 'This action adds a new auth';
  }

  async createAccessToken(siswa: Siswa): Promise<string> {
    const payload = {
      sub: siswa.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    return hash === password;
  }
}
