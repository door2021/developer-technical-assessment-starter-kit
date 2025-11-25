import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: Partial<User>): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const { email, password } = credentials;
    return this.authService.login(email, password);
  }
}
