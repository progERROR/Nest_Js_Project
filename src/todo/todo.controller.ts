import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }

  @Get('/:todoId')
  @HttpCode(HttpStatus.OK)
  public async getTodoById(
    @Param('todoId') todoId: number,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.getTodoById(todoId);

    if (!todo) {
      throw new HttpException(
        'There is no such todo with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createTodo(
    @Body(new ValidationPipe()) todoCreateDto: TodoCreateDto,
  ): Promise<TodoEntity> {
    return this.todoService.createTodo(todoCreateDto);
  }

  @Patch('/:todoId')
  @HttpCode(HttpStatus.OK)
  public async updateTodo(
    @Body(new ValidationPipe()) todoUpdateDto: TodoUpdateDto,
    @Param('todoId') todoId: number,
  ): Promise<TodoEntity> {
    const updatedTodoResult = await this.todoService.updateTodo(
      todoId,
      todoUpdateDto,
    );

    if (!updatedTodoResult.affected) {
      throw new HttpException(
        'There is no such todo with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.todoService.getTodoById(todoId);
  }

  @Delete('/:todoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTodo(@Param('todoId') todoId: number): Promise<void> {
    const deleteTodoResult = await this.todoService.deleteTodo(todoId);

    if (!deleteTodoResult.affected) {
      throw new HttpException(
        'There is no such todo with this id',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
