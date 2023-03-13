import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './users.pb';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_NAME,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('MICRO_USER_GRPC_URL'),
              package: USER_PACKAGE_NAME,
              protoPath: configService.get<string>('MICRO_USER_GRPC_NODE'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
