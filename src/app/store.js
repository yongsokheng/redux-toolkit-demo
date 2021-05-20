import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer
  },
});
