export class UpdateKelasDto {
  nama_kelas: string;
  wali_kelas: string;

  constructor(nama_kelas: string, wali_kelas: string) {
    this.nama_kelas = nama_kelas;
    this.wali_kelas = wali_kelas;
  }
}
