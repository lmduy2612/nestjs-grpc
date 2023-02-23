import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
          // host: 'mysql_db', // for docker
          host: configService.get<string>('MYSQL_HOST'), // for localhost
          port: configService.get<number>('MYSQL_PORT'),
          database: configService.get<string>('MYSQL_DATABASE'),
          username: configService.get<string>('MYSQL_USERNAME'),
          password: configService.get<string>('MYSQL_PASSWORD'),
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
