import { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseDetailsList.scss";
import { Link } from "react-router-dom"; 


function WarehouseDetailsList({ inventories }) {

    return (
      <section className="inventory-list">
        <div className="inventory-list__index">
          <div className="inventory-list__title">
            <h4 className="inventory-list__title-text">Inventory Item</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
          <div className="inventory-list__title">
            <h4 className="inventory-list__title-text">Category</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
          <div className="inventory-list__title">
            <h4 className="inventory-list__title-text">Status</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
          <div className="inventory-list__title">
            <h4 className="inventory-list__title-text">Qty</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
          <div className="inventory-list__title">
            <h4 className="inventory-list__title-text">Warehouse</h4>
            <img className="inventory-list__sort" src={sort} alt="sort" />
          </div>
        </div>
  
        <div className="inventory-list__container">
          {inventories.map((inventory) => (
            <div key={inventory.id} className="inventory-list__item">
              <div className="inventory-list__details">
                <div className="inventory-list__content">
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
                  <div className="inventory-list__info">
                    <h4 className="inventory-list__label">Category</h4>
                    <p className="inventory-list__text inventory-list__text--category">
                      {inventory.category}
                    </p>
                  </div>
                </div>
  
                <div className="inventory-list__content inventory-list__content--status">
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
                  <div className="inventory-list__info">
                    <h4 className="inventory-list__label">Qty</h4>
                    <p className="inventory-list__text">{inventory.quantity}</p>
                  </div>
                  <div className="inventory-list__info">
                    <h4 className="inventory-list__label">Warehouse</h4>
                    <p className="inventory-list__text">
                      {inventory.warehouse_name}
                    </p>
                  </div>
                </div>
              </div>
              {/* Actions row placed below details */}
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










// function WarehouseDetailsList({ warehouse }) {
//     const [warehouses, setWarehouses] = useState([]);

//     useEffect(() => {
//         const fetchWarehouses = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses`);
//                 setWarehouses(response.data);
//             } catch (error) {
//                 console.error("Error fetching warehouses:", error);
//             }
//         };

//         fetchWarehouses();
//     }, []);

//     return (
//         <section className="warehouse-list">

//             <div className="warehouse-list__container">
//                 {warehouses.map((warehouse) => (
//                     <div key={warehouse.id} className="warehouse-list__item">
//                         <div className="warehouse-list__details">
//                             <div className="warehouse-list__content">
//                                 <div className="warehouse-list__info"> 
//                                     <h4 className="warehouse-list__label">Warehouse</h4>
//                                     <div className="warehouse-list__name">
//                                         {/* <Link to={`/warehouses/${warehouse.id}`}  */}
//                                             {/* <p className="warehouse-list__text warehouse-list__text--name">{warehouse.warehouse_name}</p>   */}
//                                         {/* </Link> */}
//                                         <Link to={`/warehouses/${warehouse.id}`} className="warehouse-list__text warehouse-list__text--name">
//                                             <p>{warehouse.warehouse_name}</p></Link>
//                                         <img className="warehouse-list__chevron" src={chevron} alt="Chevron Icon" />
//                                     </div>
//                                 </div>
//                                 <div className="warehouse-list__info"> 
//                                     <h4 className="warehouse-list__label">Address</h4>
//                                     <p className="warehouse-list__text warehouse-list__text--address">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
//                                 </div>
//                             </div>

//                             <div className="warehouse-list__content warehouse-list__content--contact">
//                                 <div className="warehouse-list__info">
//                                     <h4 className="warehouse-list__label">Contact Name</h4>
//                                     <p className="warehouse-list__text">{warehouse.contact_name}</p>
//                                 </div>
//                                 <div className="warehouse-list__info">
//                                     <h4 className="warehouse-list__label">Contact Information</h4>
//                                     <p className="warehouse-list__text">{warehouse.contact_phone}</p>
//                                     <p className="warehouse-list__text">{warehouse.contact_email}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Actions row placed below details */}
//                         <div className="warehouse-list__actions">
//                             <img className="warehouse-list__icon" src={deleteIcon} alt="Delete icon" />
//                             <img className="warehouse-list__icon" src={editIcon} alt="Edit icon" />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         </section>
//     );
// }


