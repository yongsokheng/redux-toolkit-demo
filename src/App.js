import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Task } from './features/task/Task';
import { BoardDetail } from './features/board/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BoardDetail />
    </div>
  );
}

export default App;
