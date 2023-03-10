import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './modules/users/users.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST_USER'),
          port: configService.get<number>('MYSQL_PORT_USER'),
          database: configService.get<string>('MYSQL_DATABASE_USER'),
          username: configService.get<string>('MYSQL_USERNAME_USER'),
          password: configService.get<string>('MYSQL_PASSWORD_USER'),
          entities: [Users],
          synchronize: true, // never true in production!
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
