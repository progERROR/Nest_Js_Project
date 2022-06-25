import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  public async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  public async getTodoById(todoId: number): Promise<TodoEntity> {
    return this.todoRepository.findOne({ where: { id: todoId } });
  }

  public async createTodo(todoCreateDto: TodoCreateDto): Promise<TodoEntity> {
    const createdTodo = this.todoRepository.create({ ...todoCreateDto });
    return this.todoRepository.save(createdTodo);
  }

  public async updateTodo(
    todoId: number,
    todoUpdateDto: TodoUpdateDto,
  ): Promise<UpdateResult> {
    return this.todoRepository.update(todoId, todoUpdateDto);
  }

  public async deleteTodo(todoId: number): Promise<DeleteResult> {
    return this.todoRepository.delete(todoId);
  }
}
