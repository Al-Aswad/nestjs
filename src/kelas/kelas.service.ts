import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKelasDto } from './dto/create-kelas.dto';
import { UpdateKelasDto } from './dto/update-kelas.dto';
import { Kelas } from './entities/kelas.entity';

@Injectable()
export class KelasService {
  constructor(
    @InjectRepository(Kelas)
    private kelasRepository: Repository<Kelas>,
  ) {}

  async create(createKelasDto: CreateKelasDto) {
    return await this.kelasRepository.save(createKelasDto);
  }

  async findAll() {
    return await this.kelasRepository.find({
      relations: {
        siswa: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.kelasRepository.findOne({
      where: {
        id,
      },
      relations: {
        siswa: true,
      },
    });
  }

  async update(id: string, updateKelaDto: UpdateKelasDto) {
    return await this.kelasRepository.update(id, updateKelaDto);
  }

  async remove(id: string) {
    try {
      return await this.kelasRepository.delete(id);
    } catch (error) {
      return 'cannot delete this kelas';
    }
  }
}
