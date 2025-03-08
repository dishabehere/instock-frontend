// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function WarehouseDetailsPage() {
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
// }

// export default WarehouseDetailsPage;




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





import "./WarehouseDetailsPage.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";

function WarehouseDetailsPage() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const getWarehouseDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/warehouses/${id}`);
        setWarehouse(data);
      } catch (e) {
        console.error("Error fetching warehouses:", e);
      }
    };

    getWarehouseDetails();
  }, [id]);


  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const getInventories = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/warehouses/${id}/inventories`
        );
        setInventories(data);
      } catch (e) {
        console.error("Error fetching warehouses:", e);
      }
    };

    getInventories();
  }, [id, warehouse]);

  if (!warehouse) {
    return <>Loading...</>;
  }

  return (
    <>
    
        {/* <WarehouseDetailsList inventories={inventories} /> */}
    </>
  );
}

export default WarehouseDetailsPage;