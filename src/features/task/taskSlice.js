import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',
};

export const addTaskAsync = createAsyncThunk(
  'task/addTask',
  async (taskName) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: taskName }), 1000)
    );
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      });
  }
});

export const { addTask } = taskSlice.actions;
export const selectTask = (state) => state.task;
export default taskSlice.reducer;
