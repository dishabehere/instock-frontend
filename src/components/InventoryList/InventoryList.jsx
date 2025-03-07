import "./InventoryList.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";

function InventoryList() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/inventories`
        );
        setInventories(response.data);
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    };

    fetchInventories();
  }, []);

  return (
    <section className="inventory-list">
      <div className="inventory-list__header">
        <h1 className="inventory-list__heading">Inventory</h1>
        <div className="inventory-list__buttons">
          <div className="inventory-list__search-bar">
            <input
              className="inventory-list__search-text"
              type="text"
              placeholder="Search..."
            />
            <img
              className="inventory-list__search-icon"
              src={searchIcon}
              alt="Search"
            />
          </div>
          <button className="inventory-list__button">+ Add New Item</button>
        </div>
      </div>

      <div className="inventory-list__index">
        <div className="inventory-list__title">
          <h4 className="inventory-list__title-text">Inventory Item</h4>
          <img className="inventory-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__title">
          <h4 className="inventory-list__title-text">Category</h4>
          <img className="inventory-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__title">
          <h4 className="inventory-list__title-text">Status</h4>
          <img className="inventory-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__title">
          <h4 className="inventory-list__title-text">Qty</h4>
          <img className="inventory-list__sort" src={sort} alt="sort" />
        </div>
        <div className="inventory-list__title">
          <h4 className="inventory-list__title-text">Warehouse</h4>
          <img className="inventory-list__sort" src={sort} alt="sort" />
        </div>
        <h4 className="inventory-list__title-text">Actions</h4>
      </div>
      <div className="inventory-list__container">
        {inventories.map((inventory) => (
          <div key={inventory.id} className="inventory-list__item">
            <div className="inventory-list__details">
              <div className="inventory-list__content">
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Inventory Item</h4>
                  <div className="inventory-list__name">
                    <p className="inventory-list__text inventory-list__text--name">
                      <Link to={`/api/inventories/${inventory.id}`}>
                        {inventory.item_name}{" "}
                      </Link>
                    </p>
                    <img
                      className="inventory-list__chevron"
                      src={chevron}
                      alt="Chevron Icon"
                    />
                  </div>
                </div>
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Category</h4>
                  <p className="inventory-list__text inventory-list__text--category">
                    {inventory.category}
                  </p>
                </div>
              </div>

              <div className="inventory-list__content inventory-list__content--status">
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Status</h4>
                  <p
                    className={`inventory-list__text--status ${
                      inventory.status === "In Stock"
                        ? "in-stock"
                        : "out-of-stock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">QTY</h4>
                  <p className="inventory-list__text">{inventory.quantity}</p>
                </div>
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Warehouse</h4>
                  <p className="inventory-list__text">
                    {inventory.warehouse_name}
                  </p>
                </div>
              </div>
            </div>
            {/* Actions row placed below details */}
            <div className="inventory-list__actions">
              <img
                className="inventory-list__icon"
                src={deleteIcon}
                alt="Delete icon"
              />
              <Link to={`/api/inventories/${inventory.id}`}>
                <img
                  className="inventory-list__icon"
                  src={editIcon}
                  alt="Edit icon"
                />{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
