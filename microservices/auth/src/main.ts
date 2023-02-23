import { Transport } from '@nestjs/microservices';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { protobufPackage } from './auth/auth.pb';
import { join } from 'path';
import { HttpExceptionFilter } from './auth/filter/http-exception.filter';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.GRPC_MICRO_AUTH_URL,
        package: protobufPackage,
        protoPath: join(process.env.GRPC_MICRO_AUTH_NODE),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
}
bootstrap();
