export type Priority = 'low' | 'medium' | 'high' | null;

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
  priority: Priority;
}

export type Filter = 'all' | 'active' | 'completed';
export type Sort = 'newest' | 'oldest';