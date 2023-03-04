import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: Role;
}
