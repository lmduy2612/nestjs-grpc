import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import {
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly authMicroservice: ClientProxy,
  ) {}

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return await firstValueFrom(
      this.authMicroservice.send('AuthMicroservice_register', body),
    );
  }

  @Put('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return await firstValueFrom(
      this.authMicroservice.send('AuthMicroservice_login', body),
    );
  }
}
