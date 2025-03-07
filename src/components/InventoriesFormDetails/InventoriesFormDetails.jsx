import { useState, useEffect } from "react";
import axios from "axios";
import "./InventoriesFormDetails.scss"

function InventoriesFormDetails({ id }) {  
  const [inventory, setInventory] = useState({
    item_name: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    setInventory(prev => ({ ...prev, category: e.target.value }));
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchInventoryItem(id);  
  }, [id]);  

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/inventories`
      );
      const extractedCategories = data.map((inventory) => inventory.category);
      const uniqueCategories = [...new Set(extractedCategories)];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    <form className="details">
      <div className="details__section">
        <h3 className="details__header">Item Details</h3>
        <h4 className="details__label">Item Name</h4>
        <label className="details__fields">
          <input
            type="text"
            name="item_name"
            className="details__name"
            value={inventory.item_name}
            readOnly
          />
        </label>
        <h4 className="details__label">Description</h4>
        <label className="details__fields">
          <textarea
            name="description"
            value={inventory.description}
            className="details__description"
            readOnly
          />
        </label>
        <h4 className="details__label">Category</h4>
        <div>
          <label className="details__dropdown">
            <select 
              name="category" 
              className="details__category"
              value={inventory.category}
              onChange={handleCategoryChange}
            >
              <option value="">Please Select</option>
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