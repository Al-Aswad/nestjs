import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Siswa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  alamat: string;

  @Column()
  kelas_id: string;

  @OneToMany(() => Siswa, (siswa) => siswa.kelas_id)
  siswa: Siswa[];
}
