import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
@Controller('task-lists/:listId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }
  @Post(':id/toggle')
  async toggleTask(
    @Param('id') id: number,
    @Param('listId') listId: number
     ): Promise<Task>{
    return await this.tasksService.toggle(id, listId);
  }

  @Post('swap')
    async swapTasks(
      @Param('listId') listId: number,
      @Body() body: { taskId1: number; taskId2: number },
    ) {
      await this.tasksService.swapTask(+listId, body.taskId1, body.taskId2);
      return { success: true };
    }
  
}