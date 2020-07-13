import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {

    //handle status & search
    const { status, search } = filterDto;

    //Use more interactive query builder feature of typeorm
    const query = this.createQueryBuilder('task');

    //Handle DTO filters
    if(status) {
      query.andWhere('task.status = :status', { status });
    }

    if(search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    }

    return query.getMany();
  }
}