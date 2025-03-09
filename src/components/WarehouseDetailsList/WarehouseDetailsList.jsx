import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import "./WarehouseDetailsList.scss";
import ModalDelete from "../ModalDelete/ModalDelete";
import { getAllInventories, deleteInventory } from "../../utils/apiUtils";

function WarehouseDetailsList() {

  const [inventories, setInventories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState(null);

  const fetchInventories = async () => {
    try {
      const data = await getAllInventories();
      setInventories(data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  // Modal for Inventories
  const openDeleteModal = (inventory) => {
    setInventoryToDelete(inventory);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setInventoryToDelete(null);
  };

  const handleDelete = async () => {
    if (inventoryToDelete) {
      const isDeleted = await deleteInventory(inventoryToDelete.id);
      if (isDeleted) {
        await fetchInventories();
        closeModal();
      } else {
        console.error("Failed to delete inventory");
      }
    }
  };
  
  return (
    <section className="inventories-list">
      <div className="inventories-list__index-container">
        <div className="inventories-list__title">
          <h4 className="inventories-list__title-text">Inventory Item</h4>
          <img className="inventories-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventories-list__title">
          <h4 className="inventories-list__title-text">Category</h4>
          <img className="inventories-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventories-list__title">
          <h4 className="inventories-list__title-text">Status</h4>
          <img className="inventories-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventories-list__title">
          <h4 className="inventories-list__title-text">Quantity</h4>
          <img className="inventories-list__sort" src={sort} alt="sort" />
        </div>
        <h4 className="inventories-list__title-text">Actions</h4>
      </div>
      <div className="inventories-list__container">
        {inventories.map((inventory) => (
          <div key={inventory.id} className="inventories-list__item">
            <div className="inventories-list__details">
              <div className="inventories-list__content">
                <div className="inventories-list__info">
                  <h4 className="inventories-list__label">Inventory Item</h4>
                  <div className="inventories-list__name">
                    <p className="inventories-list__text inventories-list__text--name inventories-list__name-wrapper ">
                      <Link to={`/inventories/${inventory.id}`}>
                        {inventory.item_name}{" "}
                      </Link>
                    </p>
                    <img
                      className="inventories-list__chevron"
                      src={chevron}
                      alt="Chevron Icon"
                    />
                  </div>
                </div>
                <div className="inventories-list__info">
                  <h4 className="inventories-list__label">Category</h4>
                  <p className="inventories-list__text inventories-list__text--category">
                    {inventory.category}
                  </p>
                </div>
              </div>

              <div className="inventories-list__content inventories-list__content--status">
                <div className="inventories-list__info">
                  <h4 className="inventories-list__label">Status</h4>

                  <p
                    className={`inventories-list__text ${
                      inventory.status === "In Stock"
                        ? "inventories-list__text--instock"
                        : "inventories-list__text--outofstock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
                <div className="inventories-list__info">
                  <h4 className="inventories-list__label">Qty</h4>
                  <p className="inventories-list__text">{inventory.quantity}</p>
                </div>
              </div>
            </div>
            {/* Actions row placed below details */}
            <div className="inventories-list__actions">
              <img
                className="inventories-list__icon"
                src={deleteIcon}
                alt="Delete icon"
                onClick={() => openDeleteModal(inventory)}
              />

              <Link to={`/inventories/${inventory.id}/edit`}>
                <img
                  className="inventories-list__icon"
                  src={editIcon}
                  alt="Edit icon"
                />{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <ModalDelete
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
        itemName={inventoryToDelete?.item_name}
        itemType="inventory item"
        itemListType="inventory"
      />
    </section>
  );
}
export default WarehouseDetailsList;
