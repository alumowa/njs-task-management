import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(

        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {

    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {

        return this.taskRepository.getTasks(filterDto);
    }

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

        if(affected === 0){
            throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
        }

        return Promise.resolve();
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }

}
