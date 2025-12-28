export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'done';
  createdAt: string;
}

export type TaskStatus = Task['status'];

export interface TasksResponse {
  data: Task[];
  meta: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface CreateTaskData {
  title: string;
  description: string;
}