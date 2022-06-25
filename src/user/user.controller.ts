import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
  Param,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqUser } from '../auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserChangeRoleDto } from './dto/user-change-role.dto';
import { Role } from './role.enum';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  private readonly logger: LoggerService = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  public async getAllUsers(): Promise<UserEntity[]> {
    this.logger.log('Receiving all users.');
    return this.userService.getAllUsers();
  }

  @Patch('/password-change')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changeUserPasswordByHimself(
    @Body(new ValidationPipe()) userChangePasswordDto: UserChangePasswordDto,
    @ReqUser() user: UserEntity,
  ): Promise<void> {
    this.logger.log(`Changing password for user with id: ${user.id}`);
    const updatedUserResult = await this.userService.changeUserPassword(
      user.id,
      userChangePasswordDto,
    );

    if (!updatedUserResult.affected) {
      this.logger.error(`There is no such user with id: ${user.id}`);
      throw new HttpException(
        'There is no such user with this id',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch('/:userId/password-change')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changeUserPasswordByAdmin(
    @Body(new ValidationPipe()) userChangePasswordDto: UserChangePasswordDto,
    @Param('userId') userId: number,
  ): Promise<void> {
    this.logger.log(`Changing password for user with id: ${userId}`);
    const updatedUserResult = await this.userService.changeUserPassword(
      userId,
      userChangePasswordDto,
    );

    if (!updatedUserResult.affected) {
      this.logger.error(`There is no such user with id: ${userId}`);
      throw new HttpException(
        'There is no such user with this id',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch('/:userId/role-change')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changeUserRole(
    @Body(new ValidationPipe()) userChangeRoleDto: UserChangeRoleDto,
    @Param('userId') userId: number,
  ): Promise<void> {
    this.logger.log(`Changing role for user with id: ${userId}`);
    const updatedUserResult = await this.userService.changeUserRole(
      userId,
      userChangeRoleDto,
    );

    if (!updatedUserResult.affected) {
      this.logger.error(`There is no such user with id: ${userId}`);
      throw new HttpException(
        'There is no such user with this id',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
