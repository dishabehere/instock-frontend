// import "./WarehouseDetailsPage.scss";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";


// function WarehouseDetailsPage() {
//     // const [inventories, setInventories] = useState([]);
  
    // useEffect(() => {
    //   const API_URL = import.meta.env.VITE_API_URL;
    //   const { id } = useParams();
  
    //   const getInventories = async () => {
    //     try {
    //       const { data } = await axios.get(`${API_URL}/api/warehouses/${id}/inventories`);
    //       setInventories(data);
    //     } catch (error) {
    //       console.error("Error fetching inventories:", error);
    //     }
    //   };
  
    //   getInventories();
    // }, []);
  
//     return (
//       <>
//         <WarehouseDetailsList inventories={inventories} />
//       </>
//     );
//   }
//  export default WarehouseDetailsPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";
import "./WarehouseDetailsPage.scss";

function WarehouseDetailsPage() {
  const { warehouseId } = useParams(); // Correctly destructure warehouseId
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const getInventories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/warehouses/${warehouseId}/inventories`);
        setInventories(data);
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    };

    getInventories();
  }, [warehouseId]);

  return (
    <>
      <WarehouseDetailsList inventories={inventories} />
    </>
  );
}

export default WarehouseDetailsPage;