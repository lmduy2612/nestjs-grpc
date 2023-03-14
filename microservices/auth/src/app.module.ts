import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './modules/auth/auth.entity';
import { AuthModule } from './modules/auth/auth.module';

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
          host: configService.get<string>('MYSQL_HOST_AUTH'),
          port: configService.get<number>('MYSQL_PORT_AUTH'),
          database: configService.get<string>('MYSQL_DATABASE_AUTH'),
          username: configService.get<string>('MYSQL_USERNAME_AUTH'),
          password: configService.get<string>('MYSQL_PASSWORD_AUTH'),
          entities: [Auth],
          synchronize: true, // never true in production!
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
