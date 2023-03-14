import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  ListUser,
  ListUserRequest,
  UpdateUserRequest,
  User,
  USER_SERVICE_NAME,
} from './users.pb';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @GrpcMethod(USER_SERVICE_NAME, 'listUser')
  private async listUser(query: ListUserRequest): Promise<ListUser> {
    const { filters, perPage, page, sort } = query;
    return this.service.findPaginate(filters, perPage, page, sort);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'getUser')
  private async getUser({ id }: GetUserRequest): Promise<User> {
    return this.service.findById(id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  private create(payload: CreateUserRequest): Promise<User> {
    return this.service.create(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'updateUser')
  private update(payload: UpdateUserRequest): Promise<User> {
    const { id } = payload;
    return this.service.update(id, payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'deleteUser')
  private delete({ id }: DeleteUserRequest): Promise<any> {
    return this.service.delete(id);
  }
}
