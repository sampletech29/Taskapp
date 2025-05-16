import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  taskList: Task[];
  status: "idle" | "loading" | "success";
}

const initialState: TaskState = {
  taskList: [],
  status: "idle",
};

const mockAPI = {
  fetchTasks: async (): Promise<Task[]> => {
    return Promise.resolve([
      { id: "1", title: "Task 1", completed: false },
    ]);
  },
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await mockAPI.fetchTasks();
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      };
      state.taskList.push(newTask);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const currentTask = state.taskList.find(task => task.id === action.payload);
      if (currentTask) {
        currentTask.completed = !currentTask.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.taskList = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "success";
        state.taskList = action.payload;
      });
  },
});

export const { addTask, toggleComplete, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
