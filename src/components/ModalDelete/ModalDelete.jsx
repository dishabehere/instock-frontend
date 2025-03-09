import Modal from "react-modal";
import React from "react";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./ModalDelete.scss";

const WarehouseModal = ({
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
      className="warehouse-modal__container"
      contentLabel="Delete Warehouse Confirmation"
    >
      <div className="warehouse-modal__container-close-button">
        <div onClick={closeModal} className="warehouse-modal__close-button">
          <img src={closeIcon} alt="Close Icon" />
        </div>
      </div>
      <div>
      <h2 className="modal__title">{`Delete ${itemName} ${itemType}?`}</h2>
      <p>
        {`Please confirm that you’d like to delete the ${itemName} from the
        list of ${itemListType}. You won’t be able to undo this action.`}
      </p>
      </div>
      <div className="warehouse-modal__container-button">
        <button className="warehouse-modal__cancel-button" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="warehouse-modal__delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default WarehouseModal;
