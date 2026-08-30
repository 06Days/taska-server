import { Test, TestingModule } from '@nestjs/testing';
import { TaskListService } from './task-list.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskList } from './entities/task-list.entity';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { Task } from '../tasks/entities/task.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';

// Mock the Repository
class MockRepository {
  save = jest.fn();
  find = jest.fn();
  findOne = jest.fn();
  delete = jest.fn();
}

describe('TaskListService', () => {
  let service: TaskListService;
  let taskListRepository: Repository<TaskList>;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskListService,
        {
          provide: 'TaskListRepository',
          useValue: new MockRepository(),
        },
        {
          provide: 'TaskRepository',
          useValue: new MockRepository(),
        },
      ],
    }).compile();

    service = module.get<TaskListService>(TaskListService);
    taskListRepository = module.get('TaskListRepository');
    taskRepository = module.get('TaskRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createList', () => {
    it('should create a new task list', async () => {
      const createTaskListDto: CreateTaskListDto = {
        name: 'My List',
      };

      const createdTaskList = await service.createList(createTaskListDto);

      expect(taskListRepository.save).toHaveBeenCalledWith(createTaskListDto);
      expect(createdTaskList).toBeDefined();
    });
  });

  describe('findAllLists', () => {
    it('should return all task lists', async () => {
      const taskLists = [
        { id: 1, name: 'List 1', tasks: [] },
        { id: 2, name: 'List 2', tasks: [] },
      ];

      taskListRepository.find.mockReturnValue(taskLists);

      const result = await service.findAllLists();

      expect(result).toEqual(taskLists);
    });
  });

  describe('findOneList', () => {
    it('should return a task list by ID', async () => {
      const taskList = {
        id: 1,
        name: 'List 1',
        tasks: [],
      };

      taskListRepository.findOne.mockReturnValue(taskList);

      const result = await service.findOneList(1);

      expect(result).toEqual(taskList);
    });

    it('should throw NotFoundException if task list is not found', async () => {
      taskListRepository.findOne.mockReturnValue(null);

      await expect(service.findOneList(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addTaskToList', () => {
    it('should add a task to a task list', async () => {
      const listId = 1;
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        due_date: '2025-01-01',
      };

      const taskList = {
        id: 1,
        name: 'My List',
        tasks: [],
      };

      taskListRepository.findOne.mockReturnValue(taskList);
      taskRepository.save.mockReturnValue({ id: 1, ...createTaskDto, TaskList });

      const result = await service.addTaskToList(listId, createTaskDto);

      expect(taskRepository.save).toHaveBeenCalledWith({
        ...createTaskDto,
        TaskList,
      });
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if the task list is not found', async () => {
      const listId = 1;
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        due_date: '2025-01-01',
      };

      taskListRepository.findOne.mockReturnValue(null);

      await expect(service.addTaskToList(listId, create
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('removeList', () => {
    it('should remove a task list by ID', async () => {
      const listId = 1;
      const result = await service.removeList(listId);

      expect(taskListRepository.delete).toHaveBeenCalledWith(listId);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the task list is not found', async () => {
      taskListRepository.delete.mockReturnValue({ affected: 0 });

      await expect(service.removeList(1)).rejects.toThrow(NotFoundException);
    });
  });
});