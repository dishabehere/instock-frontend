import { useState, useEffect } from "react";
import Modal from 'react-modal';
import React from "react";

// const [modalIsOpen, setModalIsOpen] = useState(false);
// const [warehouseToDelete, setWarehouseToDelete] = useState(null);

// const openModal = (warehouse) => {
//     setWarehouseToDelete(warehouse);
//     setModalIsOpen(true);
//   };
  
//   const closeModal = () => {
//     setModalIsOpen(false);
//     setWarehouseToDelete(null);
//   };
  
//   <img 
//   className="warehouse-list__icon" 
//   src={deleteIcon} 
//   alt="Delete icon" 
//   onClick={() => openModal(warehouse)}
// />

// <Modal
//   isOpen={modalIsOpen}
//   onRequestClose={closeModal}
//   contentLabel="Delete Warehouse Confirmation"
// >
//   <h2>Delete {warehouseToDelete?.warehouse_name}</h2>
//   <p>Are you sure you want to delete this warehouse?</p>
//   <button onClick={closeModal}>Cancel</button>
//   <button onClick={() => {
//     // Add your delete logic here
//     console.log(`Deleting warehouse: ${warehouseToDelete?.warehouse_name}`);
//     closeModal();
//   }}>Delete</button>
// </Modal>

function WarehouseModal({ isOpen, onClose, warehouse, onDelete }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Delete Warehouse Confirmation"
        >
            <h2>Delete {warehouse?.warehouse_name}</h2>
            <p>Are you sure you want to delete this warehouse?</p>
            <button onClick={onClose}>Cancel</button>
            <button
                onClick={() => {
                    onDelete(warehouse);
                    onClose();
                }}
            >
                Delete
            </button>
        </Modal>
    );
}

export default WarehouseModal;