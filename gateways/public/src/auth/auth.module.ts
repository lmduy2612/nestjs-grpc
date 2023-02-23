import { ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('GRPC_MICRO_AUTH_URL'),
              package: AUTH_PACKAGE_NAME,
              protoPath: configService.get<string>('GRPC_MICRO_AUTH_NODE'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
