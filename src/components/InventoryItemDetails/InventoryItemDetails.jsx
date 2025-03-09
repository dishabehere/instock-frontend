import "./InventoryItemDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function InventoryItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState("null");

  useEffect(() => {
    const fetchItem = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`
        );

        setItem(response.data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchItem(id);
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
            <p className="item__header">{item.item_name}</p>
          </div>
        </Link>
        <Link to={`/inventories/${id}/edit`}>
          <div className="item__icon">
            <img
              className="item__edit"
              src="../src/assets/icons/edit-white-24px.svg"
              alt="edit icon"
            />
            <p className="item__text-edit">Edit</p>
          </div>
        </Link>
      </div>
      <div className="item__details">
        <div className="item__descriptors">
          <div className="item__paragraph">
            <h4 className="item__title">Item Description:</h4>
            <p className="item__text">{item.description}</p>
          </div>
          <h4 className="item__title">Category:</h4>
          <p className="item__text">{item.category}</p>
        </div>
        <div className="item__quantities">
          <div className="item__amount">
            <div className="item__textwrap">
              <h4 className="item__title">Status:</h4>
              <p
                className={`item__text ${
                  item.status === "In Stock"
                    ? "item__text--instock"
                    : "item__text--outofstock"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="item__textwrap">
              <h4 className="item__title">Quantity:</h4>
              <p className="item__text">{item.quantity}</p>
            </div>
          </div>
          <h4 className="item__title">Warehouse:</h4>
          <p className="item__text">{item.warehouse_name}</p>
        </div>
      </div>
    </section>
  );
}

export default InventoryItemDetails;
