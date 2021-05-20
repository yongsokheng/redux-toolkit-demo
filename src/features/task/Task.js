import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  addTaskAsync,
  selectTask
} from './taskSlice';

export function Task() {
  const taskData = useSelector(selectTask);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  return (
    <div>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <button
        onClick={() => dispatch(addTask(taskName))}
      >
        Add Task
      </button>

      <button
        onClick={() => dispatch(addTaskAsync(taskName))}
      >
        {taskData.status === 'loading' ? 'Loading' : 'Add Task Async'}
      </button>

      <ul>
        {taskData.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          )
        )}
      </ul>
    </div>
  );
}
