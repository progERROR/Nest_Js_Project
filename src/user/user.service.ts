import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserChangePasswordDto } from './dto/user-change-password.dto';
import { UserChangeRoleDto } from './dto/user-change-role.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async getUserById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  public async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const usersInDB = await this.getAllUsers();
    if (!usersInDB.length) {
      userCreateDto['role'] = 'ADMIN';
    }

    const { password } = userCreateDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    userCreateDto = { ...userCreateDto, password: hashedPassword };

    const createdUser = this.userRepository.create({ ...userCreateDto });

    return this.userRepository.save(createdUser);
  }

  public async changeUserPassword(
    userId: number,
    userChangePasswordDto: UserChangePasswordDto,
  ): Promise<UpdateResult> {
    const { password } = userChangePasswordDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.update(userId, { password: hashedPassword });
  }

  public async changeUserRole(
    userId: number,
    userChangeRoleDto: UserChangeRoleDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(userId, userChangeRoleDto);
  }

  public async deleteUser(userId: number): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
