import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

function WarehouseDetailsPage() {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState(null);

    useEffect(() => {
        const fetchWarehouseDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
                setWarehouse(response.data);
            } catch (error) {
                console.error("Error fetching warehouse details:", error);
            }
        };

        fetchWarehouseDetails();
    }, [warehouseId])

    if (!warehouse) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <WarehouseDetails warehouse={warehouse} /> 
        </div>
    );
}

export default WarehouseDetailsPage;