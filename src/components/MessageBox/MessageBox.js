import React from 'react'
import Modal from 'react-modal';
import './MessageBox.css'

Modal.setAppElement('#root');

export const MessageBox = ({message, modalIsOpen, closeModal}) => {
    return (
      <div>
        <Modal className='modal-window' isOpen={modalIsOpen} onRequestClose={!modalIsOpen}>
            <h2 className='modal-window_text'>{message}</h2>
            <button className='modal-window_btn' onClick={closeModal}>Ok</button>
        </Modal>
      </div>
    );
}
