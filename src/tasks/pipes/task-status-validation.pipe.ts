import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

    transform(value: any) {


        //Validate value is one of our enums
        const statusCased = value.toUpperCase();

        if(!this.isStatusValid(statusCased)){
            throw new BadRequestException('Invalid status', `Status must be one of ${Object.values(TaskStatus)}`);
        }

        return statusCased;
    }

    private isStatusValid(status: any): boolean {

        return Object.values(TaskStatus).includes(status);
    }
}