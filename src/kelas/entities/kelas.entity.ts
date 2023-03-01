import { Siswa } from 'src/siswa/entities/siswa.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kelas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  waliKelas: string;

  @ManyToOne(() => Siswa, (siswa) => siswa.kelas_id)
  siswa: Siswa[];
}
