import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class UserChangePasswordDto {
  @ApiProperty({
    example: 'Qwe_12345',
    description: 'The new password of the existing user',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is weak, please create a stronger password!',
  })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    example: 'Qwe_12345',
    description: 'Confirmation of the new password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  @Match('password', {
    message: 'Passwords do not match!',
  })
  @IsNotEmpty()
  public confirmPassword: string;
}
