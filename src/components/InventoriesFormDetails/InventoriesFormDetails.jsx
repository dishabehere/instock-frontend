// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./InventoriesFormDetails.scss";

// function InventoriesFormDetails({ id }) {
//   const [inventory, setInventory] = useState({
//     item_name: "",
//     description: "",
//     category: "",
//   });
//   const [categories, setCategories] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInventory((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     setInventory((prev) => ({ ...prev, category: e.target.value }));
//   };

//   useEffect(() => {
//     fetchCategories();
//     if (id) fetchInventoryItem(id);
//   }, [id]);

//   async function fetchCategories() {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/inventories`
//       );
//       const extractedCategories = data.map((inventory) => inventory.category);
//       const uniqueCategories = [...new Set(extractedCategories)];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   }

//   async function fetchInventoryItem(id) {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`
//       );
//       setInventory(data);
//     } catch (error) {
//       console.error("Error fetching inventory item:", error);
//     }
//   }

//   return (
//     <form className="details" onSubmit={handleSubmit}>
//       <div className="details__section">
//         <h3 className="details__header">Item Details</h3>
//         <h4 className="details__label">Item Name</h4>
//         <label className="details__fields">
//           <input
//             type="text"
//             name="item_name"
//             className={`details__name ${
//               submit && inventory.item_name.trim() === ""
//                 ? "details__name--invalid"
//                 : ""
//             }`}
//             value={inventory.item_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <h4 className="details__label">Description</h4>
//         <label className="details__fields">
//           <textarea
//             name="description"
//             value={inventory.description}
//             className={`details__description ${
//               submit && inventory.description.trim() === ""
//                 ? "details__description--invalid"
//                 : ""
//             }`}
//             onChange={handleInputChange}
//           />
//         </label>
//         <h4 className="details__label">Category</h4>
//         <div>
//           <label className="details__dropdown">
//             <select
//               name="category"
//               className={`details__category ${
//                 submit &&
//                 (inventory.category === "" ||
//                   inventory.category === "Please Select")
//                   ? "details__category--invalid"
//                   : ""
//               }`}
//               value={inventory.category}
//               onChange={handleCategoryChange}
//             >
//               <option value="">Please Select</option>
//               {categories.map((category, index) => (
//                 <option
//                   className="details__options"
//                   key={index}
//                   value={category}
//                 >
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default InventoriesFormDetails;

// InventoriesFormDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InventoriesFormDetails.scss";
import InventoriesFormError from "../InventoriesFormError/InventoriesFormError.jsx";

function InventoriesFormDetails({ id, formData, handleInputChange, errors }) {
  const [categories, setCategories] = useState([]);

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
    <div className="details">
      <div className="details__section">
        <h3 className="details__header">Item Details</h3>
        <h4 className="details__label">Item Name</h4>
        <label className="details__fields">
          <input
            type="text"
            name="item_name"
            className={`details__name ${errors.item_name ? "details__name--invalid" : ""}`}
            value={formData.item_name}
            onChange={handleInputChange}
          />
          {errors.item_name && <InventoriesFormError  />}
        </label>
        <h4 className="details__label">Description</h4>
        <label className="details__fields">
          <textarea
            name="description"
            value={formData.description}
            className={`details__description ${errors.description ? "details__description--invalid" : ""}`}
            onChange={handleInputChange}
          />
          {errors.description && <InventoriesFormError  />}
        </label>
        <h4 className="details__label">Category</h4>
        <div>
          <label className="details__dropdown">
            <select
              name="category"
              className={`details__category ${errors.category ? "details__category--invalid" : ""}`}
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Please Select</option>
              {categories.map((category, index) => (
                <option
                  className="details__options"
                  key={index}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <InventoriesFormError />}
          </label>
        </div>
      </div>
    </div>
  );
}

export default InventoriesFormDetails;