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

  findAll() {
    return this.siswaRepository.find({
      relations: {
        kelas: true,
      },
    });
  }

  findOne(id: string) {
    return this.siswaRepository.findOne({
      where: {
        id,
      },
      relations: {
        kelas: true,
      },
    });
  }

  update(id: string, updateSiswaDto: UpdateSiswaDto) {
    return this.siswaRepository.update(id, updateSiswaDto);
  }

  remove(id: string) {
    return this.siswaRepository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // async validateUser(email: string): Promise<any> {
  //   const user = await this.siswaRepository.findOne({
  //     where: {
  //       email,
  //     },
  //   });

  //   if (user) {
  //     return user;
  //   }

  //   return null;
  // }
}
