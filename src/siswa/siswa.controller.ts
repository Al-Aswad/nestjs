import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/interfaces/role';
import { Public } from 'src/auth/public.decorator';

@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createSiswaDto: CreateSiswaDto) {
    return this.siswaService.create(createSiswaDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.siswaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siswaService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiswaDto: UpdateSiswaDto) {
    return this.siswaService.update(id, updateSiswaDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siswaService.remove(id);
  }
}
