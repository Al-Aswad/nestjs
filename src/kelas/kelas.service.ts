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

  create(createKelasDto: CreateKelasDto) {
    console.log(createKelasDto);
    return this.kelasRepository.save(createKelasDto);
  }

  findAll() {
    return this.kelasRepository.find({
      relations: {
        siswa: true,
      },
    });
  }

  findOne(id: string) {
    return this.kelasRepository.findOne({
      where: {
        id,
      },
      relations: {
        siswa: true,
      },
    });
  }

  update(id: string, updateKelaDto: UpdateKelasDto) {
    return this.kelasRepository.update(id, updateKelaDto);
  }

  remove(id: string) {
    return this.kelasRepository.delete(id);
  }
}
