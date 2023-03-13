import { Observable } from 'rxjs';

import { Body, Query, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateUserRequest,
  ListUser,
  ListUserRequest,
  User,
  USER_SERVICE_NAME,
  UserServiceClient,
} from './users.pb';

@Controller('users')
@ApiTags('User')
export class UsersController {
  private svc: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get('')
  @ApiOperation({ summary: 'List user' })
  private async list(
    @Query() query: ListUserRequest,
  ): Promise<Observable<ListUser>> {
    return this.svc.listUser(query);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  private async create(
    @Body() body: CreateUserRequest,
  ): Promise<Observable<User>> {
    return this.svc.createUser(body);
  }
}
