import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function InventoriesFormStock(id) {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
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

  const fetchInventories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/inventories`
      );
      return data;
    } catch (error) {
      console.error("Error fetching inventories:", error);
      return [];
    }
  };

  const getWarehouses = (inventories) => {
    const warehouseNames = inventories.map(
      (inventory) => inventory.warehouse_name
    );
    return [...new Set(warehouseNames)];
  };

  useEffect(() => {
    const loadData = async () => {
      const inventories = await fetchInventories();
      const warehouses = getWarehouses(inventories);
      setWarehouses(warehouses);

      if (id) {
        const selectedInventory = inventories.find(
          (inventory) => inventory.id === id
        );
        if (selectedInventory) {
          setInventory(selectedInventory);
        }
      }
    };

    loadData();
  }, [id]);

  return (
    <form>
      <div className="stock">
        <h2 className="stock__availability">Item Availability</h2>
        <p className="stock__label">Status</p>
        <label className="stock__selector">
          <input
            type="radio"
            name="stock_status"
            value="instock"
            className="stock__instock"
            checked={stockStatus === "instock"}
            onChange={handleStatusChange}
          />
          In stock
        </label>
        <label className="stock__selector">
          <input
            type="radio"
            name="stock_status"
            value="outofstock"
            className="stock__outofstock"
            checked={stockStatus === "outofstock"}
            onChange={handleStatusChange}
          />
          Out of Stock
        </label>
      </div>
      {stockStatus === "instock" && (
        <>
          <p className="stock__quantity">Quantity</p>
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

      <p className="stock__label">Warehouse</p>
      <label className="stock__field">
        <select
          name="warehouse_name"
          className="stock__locations"
          value={inventory.warehouse_name}
          onChange={handleInputChange}
        >
          <option value="">Please select</option>
          {warehouses.map((warehouse, index) => (
            <option key={index} value={warehouse}>
              {warehouse}
            </option>
          ))}
        </select>
      </label>
      <div>Cancel</div>
      <div className="stock__submit">
        {isEditPage ? (
          <div className="stock__save">Save</div>
        ) : (
          <div className="stock__add">+ Add Item</div>
        )}
      </div>
    </form>
  );
}

export default InventoriesFormStock;
