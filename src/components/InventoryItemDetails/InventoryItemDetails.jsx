import "./InventoryItemDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function InventoryItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState("null");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <section className="item">
      <div className="item__container">
        <Link to={`/inventories`}>
          <div className="item__wrapper">
            <img
              className="item__img"
              src="../src/assets/icons/arrow_back-24px.svg"
              alt="arrow-icon"
            ></img>
            <h3 className="item__title">{item.item_name}</h3>
          </div>
        </Link>
        <div>
          <img
            className="item__edit"
            src="../src/assets/icons/edit-white-24px.svg"
            alt="edit icon"
          />
        </div>
      </div>
      <div className="item__details">
        <div className="item__descriptors">
          <h3 className="item__description">Item Description</h3>
          <p className="item__text">{item.description}</p>
          <h3 className="item__category">Category</h3>
          <p className="item__text">{item.category}</p>
        </div>
        <div className="item__quantities">
          <div className="item__amoount">
            <h3 className="item__status">Status</h3>
            <p className="item__stock">{item.stock}</p>
            <h3 className="item__quantity">Quantity</h3>
            <p className="item__text">{item.quantity}</p>
          </div>
          <h3 className="item__warehouse">Warehouse</h3>
          <p className="item__text">{item.warehouse_name}</p>
        </div>
      </div>
    </section>
  );
}

export default InventoryItemDetails;
