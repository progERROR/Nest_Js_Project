import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app/app.module';
import * as winstonconfig from './configs/winstonconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonconfig),
    cors: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Js Project For KPI')
    .setDescription(
      'There will be shown all of the API routes that are exist to this moment.',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      description: `Pass here a JWT`,
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });

  await app.listen(process.env.PORT || configService.get('PORT'));
  console.log(configService.get('HOST'));
}
bootstrap();
