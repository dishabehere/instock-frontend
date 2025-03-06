import { useState, useEffect } from "react";
import { fetchInventoryItem } from "../../utils/inventoryUtils";

function InventoriesFormDetails({ id }) {
  const [inventory, setInventory] = useState({
    item_name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchInventoryData();
  }, [id]);

  async function fetchInventoryData() {
    try {
      const data = await fetchInventoryItem(id);
      setInventory(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form>
      <div className="details">
        <h3 className="details__header">Item Details</h3>
        <p className="details__label">Item Name</p>
        <label className="details__fields">
          <input
            type="text"
            name="name"
            className="details__name"
            value={inventory.item_name}
          />
        </label>
        <p className="details__label">Description</p>
        <label className="details__fields">
          <textarea
            type="text"
            name="description"
            value={inventory.description}
            className="details__description"
          />
        </label>
        <p className="details__label">Category</p>
        <div>
          <label className="details__dropdown">
            <select
              name="category"
              className="details__category"
              value={inventory.category}
            >
              <option value="">{inventory.category}</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </form>
  );
}

export default InventoriesFormDetails;
