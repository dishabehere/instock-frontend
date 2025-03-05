import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
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
                            <div className="warehouse-list__column">
                                <h4 className="warehouse-list__label">WAREHOUSE</h4>
                                <p className="warehouse-list__name">{warehouse.warehouse_name} &gt;</p>
                                <h4 className="warehouse-list__label">ADDRESS</h4>
                                <p className="warehouse-list__address">{warehouse.address}</p>
                            </div>

                            <div className="warehouse-list__column">
                                <h4 className="warehouse-list__label">CONTACT NAME</h4>
                                <p className="warehouse-list__contact">{warehouse.contactName}</p>
                                <h4 className="warehouse-list__label">CONTACT INFORMATION</h4>
                                <p className="warehouse-list__info">{warehouse.contactInfo}</p>
                            </div>
                        </div>

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
