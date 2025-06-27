import { KanbanData } from '../types/kanbanTypes';

export const initialData: KanbanData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Online fees payment' },
    'task-2': { id: 'task-2', title: 'Attendance checking' },
    'task-3': { id: 'task-3', title: 'Admission, Staff & School' },
    'task-4': { id: 'task-4', title: 'Re-Deploy' },
    'task-5': { id: 'task-5', title: 'Admission, Staff & School' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4', 'task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Resolved',
      taskIds: ['task-3'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};