import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiswaModule } from './siswa/siswa.module';
import { KelasModule } from './kelas/kelas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeconf } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './db/data.source';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeconf),
    SiswaModule,
    KelasModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
