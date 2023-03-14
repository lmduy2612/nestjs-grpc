import { Observable } from 'rxjs';

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  ListUser,
  ListUserRequest,
  UpdateUserRequest,
  User,
  USER_SERVICE_NAME,
  UserServiceClient,
  Empty,
} from './users.pb';

@UseGuards(AuthGuard)
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

  @Get(':id')
  @ApiOperation({ summary: 'Detail user' })
  private async detail(
    @Param('id') id: GetUserRequest,
  ): Promise<Observable<User>> {
    return this.svc.getUser({ id: Number(id) });
  }

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  private async create(
    @Body() body: CreateUserRequest,
  ): Promise<Observable<User>> {
    return this.svc.createUser(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  private async update(
    @Param('id') id: number,
    @Body() body: UpdateUserRequest,
  ): Promise<Observable<User>> {
    return this.svc.updateUser({ ...body, id });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  private async delete(
    @Param('id') id: DeleteUserRequest,
  ): Promise<Observable<Empty>> {
    return this.svc.deleteUser({ id: Number(id) });
  }
}
