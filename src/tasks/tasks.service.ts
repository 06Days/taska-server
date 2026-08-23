import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }
async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

async remove(id: number): Promise<void> {
  const result = await this.taskRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Task with ID ${id} not found`);
  }
}

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }


}


