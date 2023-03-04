export class CreateKelasDto {
  name: string;
  wali_kelas: string;

  constructor(name: string, wali_kelas: string) {
    this.name = name;
    this.wali_kelas = wali_kelas;
  }
}
