
import { useState, useEffect } from "react";
import axios from "axios";
import "./InventoriesFormStock.scss"

function InventoriesFormStock({id}) {

  const [stockStatus, setStockStatus] = useState("instock");
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState({
    warehouse_name: "",
    quantity: "",
  });

  const handleStatusChange = (event) => {
    setStockStatus(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchWarehouses();
    if (id) fetchInventoryItem(id);
  }, [id]);

  async function fetchWarehouses() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/inventories`
      );
      const extractedWarehouses = data.map(
        (inventory) => inventory.warehouse_name
      );
      const uniqueWarehouses = [...new Set(extractedWarehouses)];

      setWarehouses(uniqueWarehouses);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  }

  async function fetchInventoryItem(id) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`
      );
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
    }
  }
  return (
    <form className="stock">
      <div className="stock__container">
      <div className="stock__section">
        <h3 className="stock__availability">Item Availability</h3>
        <h4 className="stock__label">Status</h4>
        <div className="stock__statuses">
        <label className="stock__selector">
          <input
            type="radio"
            name="status"
            value="instock"
            className="stock__status"
            checked={stockStatus === "instock"}
            onChange={handleStatusChange}
          />
          In stock
        </label>
        <label className="stock__selector">
          <input
            type="radio"
            name="status"
            value="outofstock"
            className="stock__status"
            checked={stockStatus === "outofstock"}
            onChange={handleStatusChange}
          />
          Out of Stock
        </label>
        </div>
      </div>
      {stockStatus === "instock" && (
        <>
          <h4 className="stock__label">Quantity</h4>
          <label className="stock__field">
            <input
              type="number"
              name="quantity"
              className="stock__number"
              value={inventory.quantity}
              onChange={handleInputChange}
              min="1"
            />
          </label>
        </>
      )}

      <h4 className="stock__label">Warehouse</h4>
      <label className="stock__field">
        <select
          name="warehouse_name"
          className="stock__locations"
          value={inventory.warehouse_name}
          onChange={handleInputChange}
        >
          <option className="stock__select" value="">Please select</option>
          {warehouses.map((warehouse, index) => (
            <option key={index} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>
      </label>
      </div>
     
    </form>
  );
}

export default InventoriesFormStock;
