import { Siswa } from 'src/siswa/entities/siswa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Kelas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  waliKelas: string;

  @OneToMany(() => Siswa, (siswa) => siswa.kelas)
  @JoinColumn({ name: 'kelas_id', referencedColumnName: 'id' })
  siswa: Siswa[];
}
