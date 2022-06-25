import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { CookieOptions, Response } from 'express';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly cookieOptions!: CookieOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(registrationDto: UserCreateDto): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(registrationDto.email);
    if (user) {
      throw new ConflictException(`User with such email is already exists`);
    }

    return this.userService.createUser(registrationDto);
  }

  public async signIn(loginDto: UserLoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    } else {
      throw new ConflictException('Wrong password');
    }
  }

  public async sendSignInResponse(
    user: UserEntity,
    response: Response,
  ): Promise<void> {
    const { email, name } = user;
    const payload: JwtPayload = { email, name };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
    });

    const accessTokenOptions = {
      ...this.cookieOptions,
      expires: new Date(
        new Date().getTime() + this.configService.get('JWT_EXPIRATION_TIME'),
      ),
      maxAge: parseInt(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    };

    response.cookie('AccessToken', accessToken, accessTokenOptions).send({
      user: instanceToPlain(user),
      accessToken,
    });
  }
}
