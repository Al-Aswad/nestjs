import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOne({
      where: {
        name: createUserDto.role,
      },
    });

    if (!role) throw new NotFoundException('role not found');

    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) throw new NotFoundException('email already exist');

    createUserDto.role_id = role?.id;

    const passwordHash = await this.hashPassword(createUserDto.password);

    return await this.userRepository.save({
      email: createUserDto.email,
      password: passwordHash,
      role_id: createUserDto.role_id,
    });
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }
}
