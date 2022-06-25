import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joiconfig from '../configs/envconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...joiconfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
