import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiswaModule } from './siswa/siswa.module';
import { KelasModule } from './kelas/kelas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typecon } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typecon), SiswaModule, KelasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
