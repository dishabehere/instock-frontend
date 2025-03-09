import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";
import { Link } from "react-router-dom";

function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses`);
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
                <div className="warehouse-list__buttons">
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
                    <Link to={`/warehouses/add`} className="warehouse-list__link">
                        <button className="warehouse-list__button">+ Add New Warehouse</button>
                    </Link>
                </div>
            </div>

            <div className="warehouse-list__index">
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Warehouse</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Address</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Contact Name</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <div className="warehouse-list__title">
                    <h4 className="warehouse-list__title-text">Contact Information</h4>
                    <img className="warehouse-list__sort" src={sort} alt="sort" />
                </div>
                <h4 className="warehouse-list__title-text">Actions</h4>
            </div>

            <div className="warehouse-list__container">
                {warehouses.map((warehouse) => (
                    <div key={warehouse.id} className="warehouse-list__item">
                        <div className="warehouse-list__details">
                            <div className="warehouse-list__content">
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">Warehouse</h4>
                                    <div className="warehouse-list__name">
                                        <Link to={`/warehouses/${warehouse.id}`} className="warehouse-list__text warehouse-list__text--name">
                                            <p>{warehouse.warehouse_name}</p></Link>
                                        <img className="warehouse-list__chevron" src={chevron} alt="Chevron Icon" />
                                    </div>
                                </div>
                                <div className="warehouse-list__info"> 
                                    <h4 className="warehouse-list__label">Address</h4>
                                    <p className="warehouse-list__text warehouse-list__text--address">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
                                </div>
                            </div>

                            <div className="warehouse-list__content warehouse-list__content--contact">
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">Contact Name</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_name}</p>
                                </div>
                                <div className="warehouse-list__info">
                                    <h4 className="warehouse-list__label">Contact Information</h4>
                                    <p className="warehouse-list__text">{warehouse.contact_phone}</p>
                                    <p className="warehouse-list__text">{warehouse.contact_email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions row placed below details */}
                        <div className="warehouse-list__actions">
                            <img className="warehouse-list__icon" src={deleteIcon} alt="Delete icon" />
                            <Link to={`/warehouses/${warehouse.id}/edit`} className="warehouse-list__link">
                                <img className="warehouse-list__icon" src={editIcon} alt="Edit icon" />
                            </Link>
                        </div> 
                    </div>
                ))}
            </div>

        </section>
    );
}

export default WarehouseList;
