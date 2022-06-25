import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of the new user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 'Qwe_12345',
    description: 'The password of the new user',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak, please create a stronger password!',
  })
  public password: string;
}
