import { TaskStatus } from "../task-status.enum";
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';


export class GetTaskFilterDto {
    @IsOptional()
    @IsIn(Object.values(TaskStatus))
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}