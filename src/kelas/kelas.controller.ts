import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KelasService } from './kelas.service';
import { CreateKelasDto } from './dto/create-kelas.dto';
import { UpdateKelasDto } from './dto/update-kelas.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/interfaces/role';

@Controller('kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createKelaDto: CreateKelasDto) {
    console.log(createKelaDto);
    return this.kelasService.create(createKelaDto);
  }

  @Get()
  findAll() {
    return this.kelasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kelasService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKelaDto: UpdateKelasDto) {
    return this.kelasService.update(id, updateKelaDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kelasService.remove(id);
  }
}
