import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { title } from 'process';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(

        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {

    }

    // getAllTasks(): Task[] {

    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {

    //     const { status, search } = filterDto;
    //     let tasks: Task[] = this.tasks;

    //     if(status && status.length){
    //         tasks = tasks.filter((task: Task) => task.status === status);
    //     }

    //     if(search && search.length){
    //         tasks = tasks.filter((task: Task) => task.title.includes(search) || task.description.includes(search));
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {

        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        const task = this.taskRepository.create(createTaskDto);

        //New tasks default to OPEN
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async deleteTaskById(id: number): Promise<void> {

        const { affected }: DeleteResult = await this.taskRepository.delete(id);

        if(!affected){
            throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
        }

        return Promise.resolve();
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {

    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

}
