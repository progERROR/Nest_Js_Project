import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  LoggerService,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) userRegistrationDto: UserCreateDto,
  ): Promise<void> {
    this.logger.log(
      `[SignUp] Of new User with email: ${userRegistrationDto.email}`,
    );
    const user = await this.authService.signUp(userRegistrationDto);

    await this.authService.sendSignInResponse(user, response);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) userLoginDto: UserLoginDto,
  ): Promise<void> {
    this.logger.log(`[SignIn] Of the User with email: ${userLoginDto.email}`);
    const user = await this.authService.signIn(userLoginDto);

    await this.authService.sendSignInResponse(user, response);
  }
}
