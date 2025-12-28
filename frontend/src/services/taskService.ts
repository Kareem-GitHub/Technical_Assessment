import api from '../api/api';
import type { 
  PaginationParams, 
  TasksResponse, 
  Task, 
  TaskStatus, 
  CreateTaskData 
} from '../types/task.types';

export const taskService = {
  getTasks: async (params: PaginationParams): Promise<TasksResponse> => {
    const response = await api.get(`/tasks?page=${params.page}&limit=${params.limit}`);
    return response.data;
  },

  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },

  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<void> => {
    await api.patch(`/tasks/${taskId}`, { status });
  },

  updateTask: async (taskId: string, data: CreateTaskData): Promise<void> => {
    await api.patch(`/tasks/${taskId}`, data);
  }
};