import Modal from "react-modal";

const ConfirmModal = ({
  appElement = "#root",
  className,
  isOpen,
  toggleModal,
  title,
  content,
}) => (
  <Modal
    appElement={appElement ? appElement : Modal.setAppElement("#root")}
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
        <span className="modal__icon" aria-hidden="true">
          icon_close
        </span>
      </button>
    </div>
    <div className="modal__body">{content}</div>
  </Modal>
);

export default ConfirmModal;
