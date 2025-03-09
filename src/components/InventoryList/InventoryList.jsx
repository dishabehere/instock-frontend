import "./InventoryList.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { getAllInventories , deleteInventory } from "../../utils/apiUtils";
import ModalDelete from "../ModalDelete/ModalDelete";

function InventoryList() {
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
    <section className="inventory-list">
      <div className="inventory-list__head">
        <h1 className="inventory-list__headings">Inventory</h1>
        <div className="inventory-list__btns">
          <div className="inventory-list__searching">
            <input
              className="inventory-list__searchtext"
              type="text"
              placeholder="Search..."
            />
            <img
              className="inventory-list__search-icn"
              src={searchIcon}
              alt="Search"
            />
          </div>
          <Link to={`/inventories/add`}>
            <button className="inventory-list__btn">+ Add New Item</button>
          </Link>
        </div>
      </div>

      <div className="inventory-list__section">
        <div className="inventory-list__titles">
          <h4 className="inventory-list__nav">Inventory Item</h4>
          <img className="inventory-list__sorting" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__titles">
          <h4 className="inventory-list__nav">Category</h4>
          <img className="inventory-list__sorting" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__titles">
          <h4 className="inventory-list__nav">Status</h4>
          <img className="inventory-list__sorting" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__titles">
          <h4 className="inventory-list__nav">Qty</h4>
          <img className="inventory-list__sorting" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__titles">
          <h4 className="inventory-list__nav">Warehouse</h4>
          <img className="inventory-list__sorting" src={sort} alt="sort" />
        </div>
        <h4 className="inventory-list__nav">Actions</h4>
      </div>
      <div className="inventory-list__outer">
        {inventories.map((inventory) => (
          <div key={inventory.id} className="inventory-list__object">
            <div className="inventory-list__detailing">
              <div className="inventory-list__descriptor-wrapper">
                <div className="inventory-list__info-field">
                  <h4 className="inventory-list__labeling">Inventory Item</h4>
                  <div className="inventory-list__name-container">
                    <div className="inventory-list__name-wrapping">
                      <p className="inventory-list__item-description inventory-list__item-description--name">
                        <Link to={`/inventories/${inventory.id}`}>
                          {inventory.item_name}
                        </Link>
                      </p>
                      <img
                        className="inventory-list__chevron-icn"
                        src={chevron}
                        alt="Chevron Icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="inventory-list__info-field">
                  <h4 className="inventory-list__labeling">Category</h4>
                  <p className="inventory-list__item-description inventory-list__item-description--category">
                    {inventory.category}
                  </p>
                </div>
              </div>

              <div className="inventory-list__descriptor-wrapper inventory-list__descriptor-wrapper--status">
                <div className="inventory-list__info-field">
                  <h4 className="inventory-list__labeling">Status</h4>

                  <p
                    className={`inventory-list__item-description ${
                      inventory.status === "In Stock"
                        ? "inventory-list__item-description--instock"
                        : "inventory-list__item-description--outofstock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
                <div className="inventory-list__info-field">
                  <h4 className="inventory-list__labeling">Qty</h4>
                  <p className="inventory-list__item-description">{inventory.quantity}</p>
                </div>
                <div className="inventory-list__info-field">
                  <h4 className="inventory-list__labeling">Warehouse</h4>
                  <p className="inventory-list__item-description">
                    {inventory.warehouse_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="inventory-list__action-icn">
              <img
                className="inventory-list__icn"
                src={deleteIcon}
                alt="Delete icon"
                onClick={() => openDeleteModal(inventory)}
              />
              <Link to={`/inventories/${inventory.id}/edit`}>
                <img
                  className="inventory-list__icn"
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

export default InventoryList;
