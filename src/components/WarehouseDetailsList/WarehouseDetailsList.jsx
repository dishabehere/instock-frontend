import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import "./WarehouseDetailsList.scss";

function WarehouseDetailsList ({warehouse , inventories }) {
    const { id } = useParams();

  return (
    <section className="inventory-list">

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
                      <Link to={`/inventories/${inventory.id}`}>
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
                    className={`inventory-list__text ${
                      inventory.status === "In Stock"
                        ? "inventory-list__text--instock"
                        : "inventory-list__text--outofstock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Qty</h4>
                  <p className="inventory-list__text">{inventory.quantity}</p>
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
              <Link to={`/inventories/${inventory.id}/edit`}>
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
export default WarehouseDetailsList;



