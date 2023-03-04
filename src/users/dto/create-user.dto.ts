export class CreateUserDto {
  email: string;
  password: string;
  role: string;
  role_id?: string;

  constructor(email: string, password: string, role: string, role_id?: string) {
    this.email = email;
    this.password = password;
    this.role = role;

    if (role_id) {
      this.role_id = role_id;
    }
  }
}
