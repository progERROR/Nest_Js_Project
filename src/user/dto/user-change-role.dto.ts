import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export class UserChangeRoleDto {
  @IsEnum(Role)
  @ApiProperty({
    description: 'Role property for user',
    enum: Role,
  })
  public role: Role;
}
