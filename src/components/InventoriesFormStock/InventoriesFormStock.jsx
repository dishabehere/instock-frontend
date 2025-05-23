import "./InventoriesFormStock.scss";
import InventoriesFormError from "../InventoriesFormError/InventoriesFormError";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAllInventories } from "../../utils/apiUtils";

function InventoriesFormStock({ formData, handleInputChange, errors }) {
  const [warehouseName, setWarehouseName] = useState([]);
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");

  useEffect(() => {
    fetchWarehouseName();
  }, []);

  async function fetchWarehouseName() {
    try {
      const data = await getAllInventories();
      const extractedWarehouseName = data.map(
        (inventory) => inventory.warehouse_name
      );
      const uniqueWarehouseName = [...new Set(extractedWarehouseName)];
      setWarehouseName(uniqueWarehouseName);
    } catch (error) {
      console.error("Error fetching Warehouse Name", error);
    }
  }

  return (
    <div className="stock">
      <div className="stock__container">
        <div className="stock__section">
          <h2 className="stock__availability">Item Availability</h2>
          <h3 className="stock__label">Status</h3>
          <div className="stock__statuses">
            <label
              className={`stock__selector ${
                formData.status === "instock" ? "stock__selector--selected" : ""
              }`}
            >
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
            <label
              className={`stock__selector ${
                formData.status === "outofstock"
                  ? "stock__selector--selected"
                  : ""
              }`}
            >
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
            <h3 className="stock__label">Quantity</h3>
            <label className="stock__field">
              <input
                type="number"
                name="quantity"
                className={`stock__number ${
                  errors.quantity ? "stock__number--invalid" : ""
                }`}
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                placeholder={!isEditPage ? "Enter quantity" : ""}
              />
              {errors.quantity && <InventoriesFormError />}
            </label>
          </>
        )}

        <h3 className="stock__label">Warehouse</h3>
        <label className="stock__field">
          <select
            name="warehouse_name"
            className={`stock__locations ${
              errors.warehouse_name ? "stock__locations--invalid" : ""
            }`}
            value={formData.warehouse_name}
            onChange={handleInputChange}
          >
            <option value="">Please select</option>
            {warehouseName.map((warehouse, index) => (
              <option className="stock__select" key={index} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
          {errors.warehouse_name && <InventoriesFormError />}
        </label>
      </div>
    </div>
  );
}

export default InventoriesFormStock;
