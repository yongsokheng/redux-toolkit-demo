import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import styles from './BoardDetail.module.css';
import { updateTask } from './boardSlice';

export function TaskModal(props) {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  return(
    <Modal show={props.show} onHide={() => {
      props.handleClose();
      setTaskName("");
    }}>
      <Modal.Header closeButton>
        <Modal.Title>{props.task.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input className={styles.formControl}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          props.handleClose();
          setTaskName("");
        }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
            dispatch(updateTask({id: props.task.id, name: taskName, listId: props.task.listId}));
            props.handleClose();
            setTaskName("");
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
