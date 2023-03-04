export class CreateSiswaDto {
  name: string;
  alamat: string;
  user_id: string;
  kelas_id: string;

  constructor(name: string, alamat: string, user_id: string, kelas_id: string) {
    this.name = name;
    this.alamat = alamat;
    this.user_id = user_id;
    this.kelas_id = kelas_id;
  }
}
