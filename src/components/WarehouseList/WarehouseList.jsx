import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseList.scss";

function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses`);
                console.log(response.data);
                setWarehouses(response.data);
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };

        fetchWarehouses();
    }, []);

    // // Filter warehouses based on search query
    // const filteredWarehouses = warehouses.filter((warehouse) =>
    //     warehouse.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <section className="warehouse-list">
            <div className="warehouse-list__header">
                <h1 className="warehouse-list__heading">Warehouses</h1>
                <div className="warehouse-list__search-bar">
                    <input
                        className="warehouse-list__search-text"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img className="warehouse-list__search-icon" src={searchIcon} alt="Search" />
                </div>
                <button className="warehouse-list__button">+ Add New Warehouse</button>
            </div>

            <div className="warehouse-list__container">
                {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="warehouse-list__item">
                        <div className="warehouse-list__details">
                            <div className="warehouse-list__content">
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">WAREHOUSE</h4>
                                    <div className="warehouse-list__name">
                                        <p className="warehouse-list__text warehouse-list__text--name">{warehouse.warehouse_name}</p>   
                                        <img className="warehouse-list__chevron" src={chevron} alt="chevron" />
                                    </div>
                                </div>
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">ADDRESS</h4>
                                    <p className="warehouse-list__text">{warehouse.address}, </p>
                                    <p className="warehouse-list__text">{warehouse.city}</p>
                                </div>
                            </div>

                            <div className="warehouse-list__content">
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">CONTACT NAME</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_name}</p>
                                </div>
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">CONTACT INFORMATION</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_phone}</p>
                                    <p className="warehouse-list__text">{warehouse.contact_email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions row placed below details */}
                        <div className="warehouse-list__actions">
                            <img className="warehouse-list__icon" src={deleteIcon} alt="Delete" />
                            <img className="warehouse-list__icon" src={editIcon} alt="Edit" />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default WarehouseList;
