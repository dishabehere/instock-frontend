import { useState, useEffect } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import WarehouseModal from "../../components/WarehouseModal/WarehouseModal";
import axios from "axios";
import "./HomePage.scss";

// function HomePage() {
// return (
//     <>
//         <WarehouseList />
//     </>
// );
// }

// export default HomePage;





// function HomePage() {
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [warehouseToDelete, setWarehouseToDelete] = useState(null);
//     const [warehouses, setWarehouses] = useState([]);

//     const openModal = (warehouse) => {
//         setWarehouseToDelete(warehouse);
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setWarehouseToDelete(null);
//     };

//     const handleDelete = async (warehouse) => {
//         try {
//             await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouse.id}`);
//             // Remove the deleted warehouse from the state
//             setWarehouses(warehouses.filter(w => w.id !== warehouse.id));
//             console.log(`Deleted warehouse: ${warehouse.warehouse_name}`);
//             closeModal();
//         } catch (error) {
//             console.error("Error deleting warehouse:", error);
//         }
//     };

//     return (
//         <>
//             <WarehouseList 
//                 warehouses={warehouses} 
//                 setWarehouses={setWarehouses} 
//                 openDeleteModal={openModal} 
//             />
//             <WarehouseModal
//                 isOpen={modalIsOpen}
//                 onClose={closeModal}
//                 warehouse={warehouseToDelete}
//                 onDelete={handleDelete}
//             />
//         </>
//     );
// }

// export default HomePage;


function HomePage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [warehouseToDelete, setWarehouseToDelete] = useState(null);
    const [warehouses, setWarehouses] = useState([]);

    // Fetch the list of warehouses when the component mounts
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

    // Function to open the modal with the warehouse to delete
    const openDeleteModal = (warehouse) => {
        setWarehouseToDelete(warehouse);
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
        setWarehouseToDelete(null);
    };

    // Handle the deletion of the warehouse
    const handleDelete = async (warehouse) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/warehouses/${warehouse.id}`);
            // Remove the deleted warehouse from the list
            setWarehouses(warehouses.filter(w => w.id !== warehouse.id));
            console.log(`Deleted warehouse: ${warehouse.warehouse_name}`);
            closeModal(); // Close the modal after deletion
        } catch (error) {
            console.error("Error deleting warehouse:", error);
        }
    };

    return (
        <>
            <WarehouseList
                warehouses={warehouses} // Pass the warehouses as a prop
                openDeleteModal={openDeleteModal} // Pass the function to open the modal
            />
            <WarehouseModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                warehouse={warehouseToDelete}
                onDelete={handleDelete}
            />
        </>
    );
}

export default HomePage;