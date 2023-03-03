import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from './entities/siswa.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Siswa])],
  controllers: [SiswaController],
  providers: [SiswaService],
})
export class SiswaModule {}
