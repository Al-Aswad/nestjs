export class CreateSiswaDto {
  name: string;
  alamat: string;
  kelas_id: string;

  constructor(name: string, alamat: string, kelas_id: string) {
    this.name = name;
    this.alamat = alamat;
    this.kelas_id = kelas_id;
  }
}
