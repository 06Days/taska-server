import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { TaskListModule } from './task-list/task-list.module';
import { TaskList } from './task-list/entities/task-list.entity';

@Module({
  
  controllers: [AppController],
  providers: [AppService],
  imports: [TaskListModule,
    
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Task, TaskList],
      synchronize: true, 
    }),
    TasksModule,
    
  
  ],
})
export class AppModule {}
