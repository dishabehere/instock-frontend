import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";
// import WarehouseModal from "../WarehouseModal/WarehouseModal";
import Modal from 'react-modal';
import React from "react";
import closeIcon from "../../assets/icons/close-24px.svg";

//added consts here
function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [warehouseToDelete, setWarehouseToDelete] = useState(null);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses`);
                setWarehouses(response.data);
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };

        fetchWarehouses();
    }, []);

//added below
    const openDeleteModal = (warehouse) => {
        setWarehouseToDelete(warehouse);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setWarehouseToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseToDelete.id}`);
            setWarehouses(currentWarehouses => currentWarehouses.filter(warehouse => warehouse.id !== deletedWarehouseId));
            console.log(`Deleted warehouse: ${warehouseToDelete.warehouse_name}`);
            closeModal();
        } catch (error) {
            console.error("Error deleting warehouse:", error);
        }
    };

//     // // Filter warehouses based on search query
//     // const filteredWarehouses = warehouses.filter((warehouse) =>
//     //     warehouse.name.toLowerCase().includes(searchQuery.toLowerCase())
//     // );


    return (
        <section className="warehouse-list">
            <div className="warehouse-list__header">
                <h1 className="warehouse-list__heading">Warehouses</h1>
                <div className="warehouse-list__buttons">
                    <div className="warehouse-list__search-bar">
                        <input
                            className="warehouse-list__search-text"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <img className="warehouse-list__search-icon" src={searchIcon} alt="Search" />
                    </div>
                    <button className="warehouse-list__button">+ Add New Warehouse</button>
                </div>
            </div>

            <div className="warehouse-list__index">
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Warehouse</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Address</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Contact Name</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Contact Information</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <h4 className="warehouse-list__title-text">Actions</h4>
            </div>

    
            <div className="warehouse-list__container">
                {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="warehouse-list__item">
                        <div className="warehouse-list__details">
                            <div className="warehouse-list__content">
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">Warehouse</h4>
                                    <div className="warehouse-list__name">
                                        <p className="warehouse-list__text warehouse-list__text--name">{warehouse.warehouse_name}</p>   
                                        <img className="warehouse-list__chevron" src={chevron} alt="Chevron Icon" />
                                    </div>
                                </div>
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">Address</h4>
                                    <p className="warehouse-list__text warehouse-list__text--address">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
                                </div>
                            </div>

                            <div className="warehouse-list__content warehouse-list__content--contact">
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">Contact Name</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_name}</p>
                                </div>
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">Contact Information</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_phone}</p>
                                    <p className="warehouse-list__text">{warehouse.contact_email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions row placed below details */}
                        <div className="warehouse-list__actions">
                            <img className="warehouse-list__icon" src={deleteIcon} alt="Delete icon" onClick={() => openDeleteModal(warehouse)}/>
                            {/* added onlick for Modal */}
                            <img className="warehouse-list__icon" src={editIcon} alt="Edit icon" />
                        </div>
                    </div>
                ))}
            </div>
            {/* added modal */}
                 <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="warehouse_modal__container"
                contentLabel="Delete Warehouse Confirmation"
            >
                <div className="warehouse_modal__container-close-button">
                    <div onClick={closeModal} className="warehouse_modal__close-button">
                        <img src={closeIcon} alt="Close Icon" />
                    </div>
                </div>
                <h2>Delete {warehouseToDelete?.warehouse_name} warehouse?</h2>
                <p>Please confirm that you’d like to delete the Washington from the list of warehouses. You won’t be able to undo this action.</p>
                <div className="warehouse-modal__container-button">
                    <button className="warehouse-modal__cancel-button" onClick={closeModal}>Cancel</button>
                    <button className="warehouse-modal__delete-button" onClick={handleDelete}>Delete</button>
                </div>
                {/* <button onClick={handleDelete0Delete</button> */}
               </Modal>
               {/* <WarehouseModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                warehouseToDelete={warehouseToDelete}
                handleDelete={handleDelete}
            /> */}
        </section>
    );
}

export default WarehouseList;

