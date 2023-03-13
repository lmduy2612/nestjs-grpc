import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<User, UsersRepository> {}
