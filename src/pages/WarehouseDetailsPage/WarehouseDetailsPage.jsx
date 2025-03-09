import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";

function WarehouseDetailsPage() {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("Fetching warehouse details...");
            const warehouseResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
            console.log("Warehouse response:", warehouseResponse.data);
            setWarehouse(warehouseResponse.data);

            console.log("Fetching inventories...");
            const inventoriesResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}/inventories`);
            console.log("Inventories response:", inventoriesResponse.data);
            setInventories(inventoriesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, [warehouseId]);


    if (!warehouse) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <WarehouseDetails warehouse={warehouse} /> 
            <WarehouseDetailsList warehouse={warehouseId} inventories={inventories}/>
        </div>
    );
}

export default WarehouseDetailsPage;