import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import * as joiconfig from '../configs/envconfig';
import * as ormconfig from '../configs/ormconfig';
import * as ormconfigProd from '../configs/ormconfig.prod';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...joiconfig,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'dev' ? ormconfig : ormconfigProd,
    ),
    TodoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AppModule {}
