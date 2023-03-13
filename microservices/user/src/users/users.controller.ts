import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateUserRequest,
  User,
  ListUser,
  USER_SERVICE_NAME,
} from './users.pb';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @GrpcMethod(USER_SERVICE_NAME, 'listUser')
  private async listUser(): Promise<ListUser> {
    return {
      data: await this.service.find(),
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  private create(payload: CreateUserRequest): Promise<User> {
    return this.service.create(payload);
  }
}
