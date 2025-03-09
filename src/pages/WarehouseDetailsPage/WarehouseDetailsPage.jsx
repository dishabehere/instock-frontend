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
            const warehouseResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
            setWarehouse(warehouseResponse.data);

            const inventoriesResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}/inventories`);
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