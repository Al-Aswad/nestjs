import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SiswaService } from 'src/siswa/siswa.service';
import { SiswaModule } from 'src/siswa/siswa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from 'src/siswa/entities/siswa.entity';
import { jwtConstants } from 'src/config/jwt.config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 60,
      },
    }),
    TypeOrmModule.forFeature([Siswa]),
    SiswaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SiswaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
