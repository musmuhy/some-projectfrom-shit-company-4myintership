import { KanbanData } from "../types/kanbanTypes";

const STORAGE_KEY = "kanban-board";

export const saveToStorage = (data: KanbanData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromStorage = (): KanbanData | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = JSON.parse(raw || "");
    // basic validation to make sure it's a KanbanData
    if (parsed && parsed.tasks && parsed.columns && parsed.columnOrder) {
      return parsed as KanbanData;
    }
  } catch (err) {
    console.error("Invalid JSON in localStorage:", err);
  }
  return null;
};