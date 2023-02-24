import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE_NAME, ValidateResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly authMicroservice: ClientProxy,
  ) {}

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(
      this.authMicroservice.send('AuthMicroservice_validate', token),
    );
  }
}
