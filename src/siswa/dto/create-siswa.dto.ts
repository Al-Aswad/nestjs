export class CreateSiswaDto {
  name: string;
  email: string;
  password: string;
  alamat: string;
  kelas_id: string;

  constructor(
    name: string,
    alamat: string,
    kelas_id: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.alamat = alamat;
    this.kelas_id = kelas_id;
    this.email = email;
    this.password = password;
  }
}
