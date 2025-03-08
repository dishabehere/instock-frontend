import "./InventoriesFormStock.scss";
import InventoriesFormError from "../InventoriesFormError/InventoriesFormError";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

function InventoriesFormStock({ formData, handleInputChange, errors }) {

  const [warehouse, setWarehouse] = useState([]);
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");


  useEffect(() => {
    fetchWarehouses();
  }, []);

  async function fetchWarehouses() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/inventories`
      );
      const extractedWarehouse = data.map((inventory) => inventory.warehouse_name);
      const uniqueWarehouse = [...new Set(extractedWarehouse)];
      setWarehouse(uniqueWarehouse);
    } catch (error) {
      console.error("Error fetching Warehouse:", error);
    }
  }

  return (
    <div className="stock">
      <div className="stock__container">
        <div className="stock__section">
          <h2 className="stock__availability">Item Availability</h2>
          <h4 className="stock__label">Status</h4>
          <div className="stock__statuses">
            <label className={`stock__selector ${formData.status === "instock" ? "stock__selector--selected" : ""}`}>
              <input
                type="radio"
                name="status"
                value="instock"
                className="stock__status"
                checked={formData.status === "instock"}
                onChange={handleInputChange}
              />
              In stock
            </label>
            <label className={`stock__selector ${formData.status === "outofstock" ? "stock__selector--selected" : ""}`}>
              <input
                type="radio"
                name="status"
                value="outofstock"
                className="stock__status"
                checked={formData.status === "outofstock"}
                onChange={handleInputChange}
              />
              Out of Stock
            </label>
          </div>
          {errors.status && <InventoriesFormError />}
        </div>
        {formData.status === "instock" && (
          <>
            <h4 className="stock__label">Quantity</h4>
            <label className="stock__field">
              <input
                type="number"
                name="quantity"
                className={`stock__number ${errors.quantity ? "stock__number--invalid" : ""}`}
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
              />
              {errors.quantity && <InventoriesFormError />}
            </label>
          </>
        )}

        <h4 className="stock__label">Warehouse</h4>
        <label className="stock__field">
          <select
            name="warehouse_name"
            className={`stock__locations ${errors.warehouse_name ? "stock__locations--invalid" : ""}`}
            value={formData.warehouse_name}
            onChange={handleInputChange}
          >
            <option className="stock__select" value="">Please select</option>
          </select>
          {errors.warehouse_name && <InventoriesFormError />}
        </label>
      </div>
    </div>
  );
}

export default InventoriesFormStock;