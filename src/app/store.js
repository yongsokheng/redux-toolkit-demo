import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/task/taskSlice';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    board: boardReducer
  },
});
