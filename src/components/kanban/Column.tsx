import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Box,
  Button,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import { ColumnType, Task } from "../../types/kanbanTypes";
import { TaskCard } from "./TaskCard";
import EditableHeader from "./EditableHeader";
import DeleteIcon from "@mui/icons-material/Delete";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onRenameColumn: (columnId: string, newTitle: string) => void;
  onDeleteColumn?: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onRenameColumn,
  onDeleteColumn,
}) => {
  const theme = useTheme();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: theme.palette.mode === "dark" ? 1 : 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={2}
      >
        <EditableHeader
          title={column.title}
          onChange={(newTitle: string) => onRenameColumn(column.id, newTitle)}
        />
        {onDeleteColumn && (
          <IconButton onClick={() => onDeleteColumn(column.id)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            width="100%"
            minHeight={100}
          >
            {tasks.map((task, index) => (
              <Draggable draggableId={task.id} index={index} key={task.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      marginBottom: 8,
                      ...provided.draggableProps.style,
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={(newTitle) => onEditTask(task.id, newTitle)}
                      onDelete={() => onDeleteTask(task.id, column.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* Add Task Input */}
      <Box display="flex" gap={1} mt={2} width="100%">
        <TextField
          placeholder="Add Task"
          size="small"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTask();
            }
          }}
          fullWidth
          variant="outlined"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            },
            fontSize: "1rem",
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddTask}
          sx={{
            borderRadius: "10%",
            textTransform: "none",
            fontSize: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default Column;