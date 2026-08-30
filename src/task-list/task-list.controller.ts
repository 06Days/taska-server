import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListsService: TaskListService) {}

  @Post()
  createList(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListsService.createList(createTaskListDto);
  }

  @Get()
  findAllLists() {
    return this.taskListsService.findAllLists();
  }

  @Get(':id')
  findOneList(@Param('id') id: string) {
    return this.taskListsService.findOneList(+id);
  }

  @Post(':id/tasks')
  addTaskToList(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskListsService.addTaskToList(+id, createTaskDto);
  }

  @Delete(':id')
  removeList(@Param('id') id: string) {
    return this.taskListsService.removeList(+id);
  }
  
  
}