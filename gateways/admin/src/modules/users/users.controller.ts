import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  User,
  CreateUserRequest,
  UserServiceClient,
  USER_SERVICE_NAME,
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

  @Post('create')
  @ApiOperation({ summary: 'Create user' })
  private async create(
    @Body() body: CreateUserRequest,
  ): Promise<Observable<User>> {
    return this.svc.createUser(body);
  }
}
