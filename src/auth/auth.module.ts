import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SiswaService } from 'src/siswa/siswa.service';
import { SiswaModule } from 'src/siswa/siswa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from 'src/siswa/entities/siswa.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 60,
      },
    }),
    TypeOrmModule.forFeature([Siswa]),
    SiswaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SiswaService],
  exports: [AuthService],
})
export class AuthModule {}
