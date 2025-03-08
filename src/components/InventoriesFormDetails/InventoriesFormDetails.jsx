import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./InventoriesFormDetails.scss";
import InventoriesFormError from "../InventoriesFormError/InventoriesFormError";

function InventoriesFormDetails({ id, formData, handleInputChange, errors }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");


  useEffect(() => {
    fetchCategories();
  }, []);

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

  return (
    <div className="details">
      <h2 className="details__header">Item Details</h2>
      <h4 className="details__label">Item Name</h4>
      <label className="details__fields">
        <input
          type="text"
          name="item_name"
          className={`details__name ${
            errors.item_name ? "details__name--invalid" : ""
          }`}
          value={isEditPage ? formData.item_name : ""}
          placeholder={isEditPage ? "" : "Item Name"}
          onChange={handleInputChange}
        />
        {errors.item_name && <InventoriesFormError />}
      </label>
      <h4 className="details__label">Description</h4>
      <label className="details__fields">
        <textarea
          name="description"
          value={isEditPage ? formData.descriptioin : ""}
          placeholder={isEditPage ? "" : "Please enter a brief item description..."}
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
