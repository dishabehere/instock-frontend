// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";

function WarehouseDetailsPage() {
//     const { warehouseId } = useParams();
//     const [warehouse, setWarehouse] = useState(null);

//     useEffect(() => {
//         const fetchWarehouseDetails = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
//                 setWarehouse(response.data);
//             } catch (error) {
//                 console.error("Error fetching warehouse details:", error);
//             }
//         };

//         fetchWarehouseDetails();
//     }, [warehouseId])

//     if (!warehouse) {
//         return <div>Loading...</div>; 
//     }

//     return (
//         <div>
//             <WarehouseDetails warehouse={warehouse} /> 
//             <WarehouseDetailsList warehouse={warehouse}/>
//         </div>
//     );
}

export default WarehouseDetailsPage;




// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";

// function WarehouseDetailsPage() {
//     const { warehouseId } = useParams();
//     const [warehouse, setWarehouse] = useState(null);
//     const [inventories, setInventories] = useState([]);

    // Fetch warehouse details by ID
    // useEffect(() => {
    //     const fetchWarehouseDetails = async () => {
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
    //             setWarehouse(response.data);
    //         } catch (error) {
    //             console.error("Error fetching warehouse details:", error);
    //         }
    //     };

    //     fetchWarehouseDetails();
    // }, [warehouseId]);

    // Fetch inventories based on warehouseId
//     useEffect(() => {
//         const fetchInventories = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/inventories`);
//                 // Filter inventories by warehouseId
//                 setInventories(response.data.filter(inventory => inventory.warehouse_id === parseInt(warehouseId)));
//             } catch (error) {
//                 console.error("Error fetching inventories:", error);
//             }
//         };

//         fetchInventories();
//     }, [warehouseId]);

//     return (
//         <div>
//             <WarehouseDetailsList inventories={inventories} />
//         </div>
//     );
// }

// export default WarehouseDetailsPage;