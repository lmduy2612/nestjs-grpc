import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME, CreateUserRequest, User } from './users.pb';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  private create(payload: CreateUserRequest): Promise<User> {
    return this.service.create(payload);
  }
}
