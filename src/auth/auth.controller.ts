import {
  Post,
  Body,
  Controller,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('me')
  me(@Headers() headers: any) {
    let token = headers.authorization;

    if (!token) {
      throw new UnauthorizedException('token not found');
    }

    token = token.replace('Bearer ', '');

    return this.authService.me(token);
  }
}
