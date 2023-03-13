import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<User, UsersRepository> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UsersRepository,
  ) {
    super(userRepository);
  }
}
