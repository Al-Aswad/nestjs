export class UpdateKelasDto {
  namaKelas: string;
  waliKelas: string;

  constructor(namaKelas: string, waliKelas: string) {
    this.namaKelas = namaKelas;
    this.waliKelas = waliKelas;
  }
}
