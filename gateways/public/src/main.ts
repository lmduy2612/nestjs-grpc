import { SwaggerCustomOptions } from '@nestjs/swagger/dist/interfaces/swagger-custom-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  setUpSwagger(app);

  await app.listen(process.env.PUBLIC_GATEWAY_PORT || 3000);
}

function setUpSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Public gateway')
    .setDescription('The Public API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      showRequestDuration: true,
    },
  };
  SwaggerModule.setup('/docs', app, document, options);
}

bootstrap();
