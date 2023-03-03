import { Post, Body, Controller, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  me(@Req() req: any, @Res() res: any) {
    // const response = {
    //   id: req.user.id,
    //   nama: req.user.nama,
    //   email: req.user.email,
    // };

    return res.status(200).json(req.user);
    // let token = headers.authorization;

    // if (!token) {
    //   throw new UnauthorizedException('token not found');
    // }

    // token = token.replace('Bearer ', '');

    // return this.authService.me(token);
  }
}
