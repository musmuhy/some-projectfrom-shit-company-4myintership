import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Column from "./Column";
import { KanbanData, Task } from "../../types/kanbanTypes";
import { initialData } from "../../utils/initialData";
import { v4 as uuid } from "uuid";
import { saveToStorage, loadFromStorage } from "../../utils/localStorageBoard";

export const KanbanBoard: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<KanbanData>(() => {
    const saved = loadFromStorage();
    return saved || initialData;
  });
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === "COLUMN") {
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      }));
    } else {
      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);
      const endTaskIds = [...end.taskIds];
      endTaskIds.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [start.id]: { ...start, taskIds: startTaskIds },
          [end.id]: { ...end, taskIds: endTaskIds },
        },
      }));
    }
  };

  const addTask = (columnId: string, title: string) => {
    const id = uuid();
    const newTask: Task = { id, title };

    setData((prev) => {
      const updatedTasks = { ...prev.tasks, [id]: newTask };
      const updatedColumn = {
        ...prev.columns[columnId],
        taskIds: [...prev.columns[columnId].taskIds, id],
      };
      return {
        ...prev,
        tasks: updatedTasks,
        columns: { ...prev.columns, [columnId]: updatedColumn },
      };
    });
  };

  const deleteTask = (taskId: string, columnId: string) => {
    setData((prev) => {
      const updatedTasks = { ...prev.tasks };
      delete updatedTasks[taskId];
      const updatedColumn = {
        ...prev.columns[columnId],
        taskIds: prev.columns[columnId].taskIds.filter((id) => id !== taskId),
      };
      return {
        ...prev,
        tasks: updatedTasks,
        columns: { ...prev.columns, [columnId]: updatedColumn },
      };
    });
  };

  const editTask = (taskId: string, newTitle: string) => {
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], title: newTitle },
      },
    }));
  };

  const renameColumn = (columnId: string, newName: string) => {
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: { ...prev.columns[columnId], title: newName },
      },
    }));
  };

  const deleteColumn = (columnId: string) => {
    setData((prev) => {
      const { ...restColumns } = prev.columns;
      const newColumnOrder = prev.columnOrder.filter((id) => id !== columnId);
      const remainingTasks = { ...prev.tasks };
      prev.columns[columnId].taskIds.forEach((id) => delete remainingTasks[id]);

      return {
        ...prev,
        columns: restColumns,
        columnOrder: newColumnOrder,
        tasks: remainingTasks,
      };
    });
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    const id = uuid();
    const newColumn = {
      id,
      title: newColumnTitle.trim(),
      taskIds: [],
    };
    setData((prev) => ({
      ...prev,
      columns: { ...prev.columns, [id]: newColumn },
      columnOrder: [...prev.columnOrder, id],
    }));
    setNewColumnTitle("");
    setIsAddingColumn(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
        p: 2,
        m: 2,
        minHeight: "80vh",
        overflow: "hidden",
        color: theme.palette.text.primary,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="COLUMN"
        >
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                overflowX: "auto",
                paddingBottom: 2,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map((id) => data.tasks[id]);
                const isUserCreated = !initialData.columnOrder.includes(
                  columnId
                );

                return (
                  <Draggable
                    draggableId={columnId}
                    index={index}
                    key={columnId}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          marginRight: 16,
                        }}
                      >
                        <Box {...provided.dragHandleProps}>
                          <Column
                            column={column}
                            tasks={tasks}
                            onAddTask={addTask}
                            onDeleteTask={deleteTask}
                            onEditTask={editTask}
                            onRenameColumn={renameColumn}
                            onDeleteColumn={
                              isUserCreated ? deleteColumn : undefined
                            }
                          />
                        </Box>
                      </div>
                    )}
                  </Draggable>
                );
              })}

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minWidth={250}
                bgcolor={theme.palette.background.default}
                borderRadius={2}
                p={2}
                sx={{ alignSelf: "flex-start" }}
              >
                {isAddingColumn ? (
                  <>
                    <TextField
                      placeholder="New column"
                      size="small"
                      value={newColumnTitle}
                      onChange={(e) => setNewColumnTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddColumn();
                        }
                      }}
                      variant="outlined"
                      sx={{
                        mb: 1,
                        width: "220px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "none" },
                          "&:hover fieldset": { border: "none" },
                          "&.Mui-focused fieldset": { border: "none" },
                        },
                        fontSize: "1rem",
                        textAlign: "center",
                      }}
                    />
                    <Button
                      onClick={handleAddColumn}
                      sx={{
                        borderRadius: "10%",
                        textTransform: "none",
                        fontSize: "1rem",
                      }}
                    >
                      Add Column
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsAddingColumn(true)}
                    sx={{
                      borderRadius: 2,
                      color: "#1976d2",
                      textTransform: "none",
                      fontSize: "1rem",
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    Add Column
                  </Button>
                )}
              </Box>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};