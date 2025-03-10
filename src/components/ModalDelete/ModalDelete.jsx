import Modal from "react-modal";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./ModalDelete.scss";

const ModalDelete = ({
  modalIsOpen,
  closeModal,
  itemName,
  itemType,
  itemListType,
  handleDelete,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal__container"
      contentLabel="Delete Warehouse Confirmation"
    >
      <div className="modal__container-close-button">
        <div onClick={closeModal} className="warehouse-modal__close-button">
          <img src={closeIcon} alt="Close Icon" />
        </div>
      </div>
      <div className="modal__container-text">
        <h1 className="modal__title">{`Delete ${itemName} ${itemType}?`}</h1>
        <p className="modal__text">
          {`Please confirm that you’d like to delete the ${itemName} from the
        list of ${itemListType}. You won’t be able to undo this action.`}
        </p>
      </div>
      <div className="modal__container-button">
        <button className="modal__cancel-button" onClick={closeModal}>
          Cancel
        </button>
        <button className="modal__delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
