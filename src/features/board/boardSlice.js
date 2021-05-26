import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const data = {
  id: 1,
  name: "Board Demo",
  lists: [
    {
      id: 1,
      name: "TODO",
      tasks: [
        {id: 1, name: "task 1", listId: 1},
        {id: 2, name: "task 2", listId: 1},
        {id: 3, name: "task 3", listId: 1},
        {id: 4, name: "task 4", listId: 1},
        {id: 5, name: "task 5", listId: 1},
      ]
    },

    {
      id: 2,
      name: "In Progress",
      tasks: [
        {id: 1, name: "task 1", listId: 2},
        {id: 2, name: "task 2", listId: 2},
        {id: 3, name: "task 3", listId: 2},
        {id: 4, name: "task 4", listId: 2},
        {id: 5, name: "task 5", listId: 2},
      ]
    },

    {
      id: 3,
      name: "Done",
      tasks: [
        {id: 1, name: "task 1", listId: 3},
        {id: 2, name: "task 2", listId: 3},
        {id: 3, name: "task 3", listId: 3},
        {id: 4, name: "task 4", listId: 3},
        {id: 5, name: "task 5", listId: 3},
      ]
    }
  ]
}

const initialState = {
  board: {lists: [{tasks: []}]},
  status: 'idle',
};

export const fetchBoardDetail = createAsyncThunk(
  'board/fetchDetail',
  async () => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: data }), 2000)
    );
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'board/addTask',
  async (task) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: new Date().getTime(), name: task.name, listId: task.listId} }), 100)
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async (task) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: task.id, name: task.name, listId: task.listId} }), 100)
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (task) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: task.id, listId: task.listId} }), 100)
    );
    return response.data;
  }
);


export const addList = createAsyncThunk(
  'board/addList',
  async (listName) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: new Date().getTime(), name: listName, tasks: []} }), 100)
    );
    return response.data;
  }
);

export const updateList = createAsyncThunk(
  'board/updateList',
  async (list) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: list.id, name: list.name} }), 100)
    );
    return response.data;
  }
);

export const deleteList = createAsyncThunk(
  'board/deleteList',
  async (list) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: {id: list.id} }), 100)
    );
    return response.data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBoardDetail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.board = action.payload;
      })

      .addCase(addTask.pending, (state) => {
      })
      .addCase(addTask.fulfilled, (state, action) => {
        let list = state.board.lists.find(list => list.id === action.payload.listId);
        list.tasks.unshift(action.payload);
      })

      .addCase(updateTask.pending, (state) => {
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        let list = state.board.lists.find(list => list.id === action.payload.listId);
        let task = list.tasks.find(task => task.id === action.payload.id);
        task.name = action.payload.name;
      })

      .addCase(deleteTask.pending, (state) => {
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        let list = state.board.lists.find(list => list.id === action.payload.listId);
        list.tasks = list.tasks.filter(task => task.id !== action.payload.id);
      })

      .addCase(addList.pending, (state) => {
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.board.lists.push(action.payload);
      })

      .addCase(updateList.pending, (state) => {
      })
      .addCase(updateList.fulfilled, (state, action) => {
        let list = state.board.lists.find(list => list.id === action.payload.id);
        list.name = action.payload.name;
      })

      .addCase(deleteList.pending, (state) => {
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.board.lists = state.board.lists.filter(list => list.id !== action.payload.id);
      })
  }
});

export const {} = boardSlice.actions;
export const selectBoard = (state) => state.board;
export default boardSlice.reducer;
