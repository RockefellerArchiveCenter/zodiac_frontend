"use client";

import { useEffect } from "react";
import Modal from "react-modal";

const ConfirmModal = ({
  appElement = "#root",
  className,
  isOpen,
  toggleModal,
  title,
  content,
}) => {
  useEffect(() => {
    Modal.setAppElement(appElement);
  }, [appElement]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      className={`modal ${className}`}
      overlayClassName="modal__overlay"
    >
      <div className="modal__header">
        <h2 className="modal__header-title">{title}</h2>
        <button
          className="modal__header-button"
          aria-label="Close"
          onClick={toggleModal}
        >
          <span className="material-icon" aria-hidden="true">
            close
          </span>
        </button>
      </div>
      <div className="modal__body">{content}</div>
    </Modal>
  );
};

export default ConfirmModal;
