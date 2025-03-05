import { useState, useEffect } from "react";
import axios from "axios";
import search from "../../assets/icons/search-24px.svg";
import "./WarehouseList.scss"


function WarehouseList(){
return (
    <>
        <section className="warehouse-list">
            <div className="warehouse-list__header">
                <h1 className="warehouse-list__heading">Warehouses</h1>
                <div className="warehouse-list__search-bar">
                    <input
                        className="warehouse-list__search-text"
                        type="text"
                        placeholder="Search..."
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                    />        
                    <img className="warehouse-list-search" src={search} alt="search logo" />
                </div>
                <button className="warehouse-list__button">
                    + Add New Warehouse
                </button>
            </div>
        </section>
    </>
);
}

export default WarehouseList;