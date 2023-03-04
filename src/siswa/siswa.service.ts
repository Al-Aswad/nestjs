import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Kelas } from 'src/kelas/entities/kelas.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { Siswa } from './entities/siswa.entity';

@Injectable()
export class SiswaService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Siswa)
    private siswaRepository: Repository<Siswa>,
    @InjectRepository(Kelas)
    private kelasRepository: Repository<Kelas>,
  ) {}

  async create(createSiswaDto: CreateSiswaDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: createSiswaDto.user_id,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    const kelas = await this.kelasRepository.findOne({
      where: {
        id: createSiswaDto.kelas_id,
      },
    });

    if (!kelas) throw new NotFoundException('kelas not found');

    return this.siswaRepository.save(createSiswaDto);
  }

  async findAll() {
    return await this.siswaRepository.find({
      relations: {
        kelas: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.siswaRepository.findOne({
      where: {
        id,
      },
      relations: {
        kelas: true,
      },
    });
  }

  async update(id: string, updateSiswaDto: UpdateSiswaDto) {
    if (updateSiswaDto.user_id) {
      const user = await this.userRepository.findOne({
        where: {
          id: updateSiswaDto.user_id,
        },
      });

      if (!user) throw new NotFoundException('user not found');
    }

    const kelas = await this.kelasRepository.findOne({
      where: {
        id: updateSiswaDto.kelas_id,
      },
    });

    if (!kelas) throw new NotFoundException('kelas not found');

    return this.siswaRepository.update(id, updateSiswaDto);
  }

  async remove(id: string) {
    return await this.siswaRepository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
