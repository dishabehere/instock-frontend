import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";
import InventoriesListPage from "../InventoriesListPage/InventoriesListPage";

function WarehouseDetailsPage() {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const [inventories, setInventories] = useState(null);

  //   useEffect(() => {
  //       const fetchWarehouseDetails = async () => {
  //           try {
  //               const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
  //               setWarehouse(response.data);
  //           } catch (error) {
  //               console.error("Error fetching warehouse details:", error);
  //           }
  //       };

  //       fetchWarehouseDetails();
  //   }, [warehouseId])

  //   useEffect(() => {
  //   const fetchInventories = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}/inventories`);
  //       setInventories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching inventories:", error);
  //     }
  //   };
  //   // console.log(setInventories)
  //   fetchInventories();
  // },);

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
            <WarehouseDetailsList warehouse={warehouseId}/>
        </div>
    );
}

export default WarehouseDetailsPage;



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
// import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";

// function WarehouseDetailsPage() {
//     const { warehouseId } = useParams();
//     const [warehouse, setWarehouse] = useState(null);
//     const [inventories, setInventories] = useState([]);

//     useEffect(() => {
//         const fetchWarehouseDetails = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}`);
//                 setWarehouse(response.data);
//                     const inventoriesResponse = await axios.get(
//                         `${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouseId}/inventories`
//                       );
//                       setInventories(inventoriesResponse.data);
//             } catch (error) {
//                 console.error("Error fetching warehouse details:", error);
//             }
//         };

//         fetchWarehouseDetails();
//     }, [warehouseId]);

//     if (!warehouse) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <WarehouseDetails warehouse={warehouse} />
//             <WarehouseDetailsList inventories={inventories} />
//         </div>
//     );
// }

// export default WarehouseDetailsPage;