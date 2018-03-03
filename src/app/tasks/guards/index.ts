import { TaskExistGuard } from './task-exists.guard';
import { TasksStateLoadingGuard } from './tasks-state-loading.guard';

export const allGuards: any[] = [TaskExistGuard, TasksStateLoadingGuard];

export * from './task-exists.guard';
export * from './tasks-state-loading.guard';
