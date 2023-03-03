import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from './entities/siswa.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@Module({
  imports: [TypeOrmModule.forFeature([Siswa])],
  controllers: [SiswaController],
  providers: [SiswaService, JwtAuthGuard],
})
export class SiswaModule {}
