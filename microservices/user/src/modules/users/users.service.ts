import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/service/base.service';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<Users, UsersRepository> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }
}
