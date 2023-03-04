import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Siswa } from './entities/siswa.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/role/entities/role.entity';
import { Users } from 'src/users/entities/users.entity';
import { Kelas } from 'src/kelas/entities/kelas.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Siswa, Kelas])],
  controllers: [SiswaController],
  providers: [SiswaService, JwtAuthGuard],
})
export class SiswaModule {}
