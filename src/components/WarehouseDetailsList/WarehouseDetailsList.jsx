// import { useState, useEffect } from "react";
// import axios from "axios";
// import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
// import editIcon from "../../assets/icons/edit-24px.svg";
// import chevron from "../../assets/icons/chevron_right-24px.svg";
// import "./WarehouseDetailsList.scss";
// import { Link } from "react-router-dom"; 

// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import axios from 'axios';
// // import "./WarehouseDetailsPage.scss";

// function WarehouseDetailsList() {
//   const { id } = useParams();
//   const [warehouse, setWarehouse] = useState(null);
//   const [inventories, setInventories] = useState([]);

//   useEffect(() => {
//     const API_URL = import.meta.env.VITE_API_URL;

//     const getWarehouseDetails = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/api/warehouses/${id}`);
//         setWarehouse(data);
//       } catch (e) {
//         console.error("Error fetching warehouse:", e);
//       }
//     };

//     const getInventories = async () => {
//       try {
//         const { data } = await axios.get(
//           `${API_URL}/api/warehouses/${id}/inventories`
//         );
//         setInventories(data);
//       } catch (error) {
//         console.error("Error fetching inventories:", error);
//       }
//     };

//     getWarehouseDetails();
//     getInventories();
//   }, [id]);

//   if (!warehouse) {
//     return <div>Loading...</div>;
//   }
//     return (
//       <section className="inventory-list">
//         <div className="inventory-list__index">
//           <div className="inventory-list__title">
//             <h4 className="inventory-list__title-text">Inventory Item</h4>
//             <img className="inventory-list__sort" src={sort} alt="sort" />
//           </div>
//           <div className="inventory-list__title">
//             <h4 className="inventory-list__title-text">Category</h4>
//             <img className="inventory-list__sort" src={sort} alt="sort" />
//           </div>
//           <div className="inventory-list__title">
//             <h4 className="inventory-list__title-text">Status</h4>
//             <img className="inventory-list__sort" src={sort} alt="sort" />
//           </div>
//           <div className="inventory-list__title">
//             <h4 className="inventory-list__title-text">Qty</h4>
//             <img className="inventory-list__sort" src={sort} alt="sort" />
//           </div>
//           <div className="inventory-list__title">
//             <h4 className="inventory-list__title-text">Warehouse</h4>
//             <img className="inventory-list__sort" src={sort} alt="sort" />
//           </div>
//         </div>
  
//         <div className="inventory-list__container">
//           {inventories.map((inventory) => (
//             <div key={inventory.id} className="inventory-list__item">
//               <div className="inventory-list__details">
//                 <div className="inventory-list__content">
//                   <div className="inventory-list__info">
//                     <h4 className="inventory-list__label">Inventory Item</h4>
//                     <div className="inventory-list__name">
//                       <p className="inventory-list__text inventory-list__text--name">
//                         <Link to={`/inventories/${inventory.id}`}>
//                           {inventory.item_name}
//                         </Link>
//                       </p>
//                       <img
//                         className="inventory-list__chevron"
//                         src={chevron}
//                         alt="Chevron Icon"
//                       />
//                     </div>
//                   </div>
//                   <div className="inventory-list__info">
//                     <h4 className="inventory-list__label">Category</h4>
//                     <p className="inventory-list__text inventory-list__text--category">
//                       {inventory.category}
//                     </p>
//                   </div>
//                 </div>
  
//                 <div className="inventory-list__content inventory-list__content--status">
//                   <div className="inventory-list__info">
//                     <h4 className="inventory-list__label">Status</h4>
//                     <p
//                       className={`inventory-list__text ${
//                         inventory.status === "In Stock"
//                           ? "inventory-list__text--instock"
//                           : "inventory-list__text--outofstock"
//                       }`}
//                     >
//                       {inventory.status}
//                     </p>
//                   </div>
//                   <div className="inventory-list__info">
//                     <h4 className="inventory-list__label">Qty</h4>
//                     <p className="inventory-list__text">{inventory.quantity}</p>
//                   </div>
//                   <div className="inventory-list__info">
//                     <h4 className="inventory-list__label">Warehouse</h4>
//                     <p className="inventory-list__text">
//                       {inventory.warehouse_name}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {/* Actions row placed below details */}
//               <div className="inventory-list__actions">
//                 <img
//                   className="inventory-list__icon"
//                   src={deleteIcon}
//                   alt="Delete icon"
//                 />
//                 <Link to={`/inventories/${inventory.id}/edit`}>
//                   <img
//                     className="inventory-list__icon"
//                     src={editIcon}
//                     alt="Edit icon"
//                   />
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }
  
//   export default WarehouseDetailsList;




import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg"; // Make sure this is correctly imported
import "./WarehouseDetailsList.scss";

function WarehouseDetailsList({ inventories }) {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const getWarehouseDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/warehouses/${id}`);
        setWarehouse(data);
      } catch (e) {
        console.error("Error fetching warehouse:", e);
      }
    };

    getWarehouseDetails();
  }, [id]);

  if (!warehouse) {
    return <div>Loading...</div>;
  }

  return (
    <section className="inventory-list">
      <div className="inventory-list__index">
        {/* Inventory List Headers */}
        {["Inventory Item", "Category", "Status", "Qty", "Warehouse"].map((title) => (
          <div key={title} className="inventory-list__title">
            <h4 className="inventory-list__title-text">{title}</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
        ))}
      </div>

      {/* Inventory Items */}
      <div className="inventory-list__container">
        {inventories.map((inventory) => (
          <div key={inventory.id} className="inventory-list__item">
            {/* Inventory Details */}
            <div className="inventory-list__details">
              <div className="inventory-list__content">
                {/* Inventory Item Name */}
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Inventory Item</h4>
                  <div className="inventory-list__name">
                    <p className="inventory-list__text inventory-list__text--name">
                      <Link to={`/inventories/${inventory.id}`}>
                        {inventory.item_name}
                      </Link>
                    </p>
                    <img
                      className="inventory-list__chevron"
                      src={chevron}
                      alt="Chevron Icon"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Category</h4>
                  <p className="inventory-list__text inventory-list__text--category">
                    {inventory.category}
                  </p>
                </div>
              </div>

              {/* Status and Quantity */}
              <div className="inventory-list__content inventory-list__content--status">
                {/* Status */}
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Status</h4>
                  <p
                    className={`inventory-list__text ${
                      inventory.status === "In Stock"
                        ? "inventory-list__text--instock"
                        : "inventory-list__text--outofstock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>

                {/* Quantity */}
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Qty</h4>
                  <p className="inventory-list__text">{inventory.quantity}</p>
                </div>

                {/* Warehouse Name */}
                <div className="inventory-list__info">
                  <h4 className="inventory-list__label">Warehouse</h4>
                  <p className="inventory-list__text">{inventory.warehouse_name}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="inventory-list__actions">
              <img
                className="inventory-list__icon"
                src={deleteIcon}
                alt="Delete icon"
              />
              <Link to={`/inventories/${inventory.id}/edit`}>
                <img
                  className="inventory-list__icon"
                  src={editIcon}
                  alt="Edit icon"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WarehouseDetailsList;



