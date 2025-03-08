import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./InventoriesFormDetails.scss";
import InventoriesFormError from "../InventoriesFormError/InventoriesFormError";
import { getInventoryItem , getAllInventories } from "../../utils/apiUtils";

function InventoriesFormDetails({  id, formData, setFormData, handleInputChange, errors }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const data = await getAllInventories();
      const extractedCategories = data.map((inventory) => inventory.category);
      const uniqueCategories = [...new Set(extractedCategories)];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    if (isEditPage && id) {
      fetchInventoryItem(id);
    }
  }, [isEditPage, id]);

  const fetchInventoryItem = async (id) => {
    try {
      const data = await getInventoryItem(id);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
    }
  };

  return (
    <div className="details">
      <h2 className="details__header">Item Details</h2>

      {/* Item Name */}
      <h4 className="details__label">Item Name</h4>
      <label className="details__fields">
        <input
          type="text"
          name="item_name"
          className={`details__name ${
            errors.item_name ? "details__name--invalid" : ""
          }`}
          value={formData.item_name}
          placeholder={!isEditPage ? "Item Name" : ""}
          onChange={handleInputChange}
        />
        {errors.item_name && <InventoriesFormError />}
      </label>

      <h4 className="details__label">Description</h4>
      <label className="details__fields">
        <textarea
          name="description"
          value={formData.description}
          placeholder={
            !isEditPage ? "Please enter a brief item description..." : ""
          }
          className={`details__description ${
            errors.description ? "details__description--invalid" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors.description && <InventoriesFormError />}
      </label>

      <h4 className="details__label">Category</h4>
      <div>
        <label className="details__dropdown">
          <select
            name="category"
            className={`details__category ${
              errors.category ? "details__category--invalid" : ""
            }`}
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Please Select</option>
            {categories.map((category, index) => (
              <option className="details__options" key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <InventoriesFormError />}
        </label>
      </div>
    </div>
  );
}

export default InventoriesFormDetails;
