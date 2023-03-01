export class CreateKelasDto {
  name: string;
  waliKelas: string;

  constructor(name: string, waliKelas: string) {
    this.name = name;
    this.waliKelas = waliKelas;
  }
}
