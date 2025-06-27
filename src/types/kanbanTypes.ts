export type Task = {
  id: string;
  title: string;
  image?: string;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type KanbanData = {
  tasks: Record<string, Task>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
};

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}