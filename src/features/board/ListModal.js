import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import styles from './BoardDetail.module.css';
import { updateList } from './boardSlice';

export function ListModal(props) {
  const [listName, seLlistName] = useState("");
  const dispatch = useDispatch();

  return(
    <Modal show={props.show} onHide={() => {
      props.handleClose();
      seLlistName("");
    }}>
      <Modal.Header closeButton>
        <Modal.Title>{props.list.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input className={styles.formControl}
          value={listName}
          onChange={(e) => seLlistName(e.target.value)}
        />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          props.handleClose();
          seLlistName("");
        }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
            dispatch(updateList({id: props.list.id, name: listName}));
            props.handleClose();
            seLlistName("");
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
