import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BoardDetail.module.css';
import { fetchBoardDetail, addTask, selectBoard, addList } from './boardSlice';

export function BoardDetail() {
  const boardData = useSelector(selectBoard);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [listName, setListName] = useState("");
  const [listToCreateTask, setListToCreateTask] = useState("");
  const [showCreateListForm, setShowCreateListForm] = useState(false);

  useEffect(() => {
    dispatch(fetchBoardDetail());
  }, []);

  return (
    <div>
      {boardData.status == 'loading' ?
        <div className={styles.loading}>Loading ...</div>
      :
        <div>
          {boardData.board.lists.map((list) => (
            <div className={styles.listItem} key={list.id}>
              <h3>{list.name}</h3>

              {listToCreateTask === list.id ?
                <div>
                  <input className={styles.formControl}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <div className={styles.btnContainer}>
                    <button className={styles.btnSecondary}
                      onClick={() => setListToCreateTask("")}
                    >
                      Cancel
                    </button>
                    <button className={styles.btnPrimary}
                      onClick={() => {
                        setListToCreateTask("");
                        dispatch(addTask({name: taskName, listId: list.id}));
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              :
                <button className={styles.createTask}
                  onClick={() => {
                    setListToCreateTask(list.id);
                    setTaskName("");
                  }}
                >
                  Create a task
                </button>
              }

              {list.tasks.map((task) => (
                <div className={styles.taskItem} key={task.id}>{task.name}</div>
              ))}
            </div>
          ))}

          {showCreateListForm ?
            <div>
              <input className={styles.formControl}
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              <div className={styles.btnContainer}>
                <button className={styles.btnSecondary}
                  onClick={() => setShowCreateListForm(false)}
                >
                  Cancel
                </button>
                <button className={styles.btnPrimary}
                  onClick={() => {
                    setShowCreateListForm(false);
                    dispatch(addList(listName));
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          :
            <button className={styles.createList}
              onClick={() => {
                setShowCreateListForm(true);
                setListName("");
              }}
            >
              Create list
            </button>
          }

        </div>
      }
    </div>
  );
}
