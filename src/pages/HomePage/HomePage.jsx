import { useState, useEffect } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
// import WarehouseModal from "../../components/WarehouseModal/WarehouseModal";
import axios from "axios";
import "./HomePage.scss";

function HomePage() {
return (
    <>
        <WarehouseList />
    </>
);
}

export default HomePage;