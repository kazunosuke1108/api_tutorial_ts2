export * from './default.service';
import { DefaultService } from './default.service';
export * from './tasks.service';
import { TasksService } from './tasks.service';
export const APIS = [DefaultService, TasksService];
