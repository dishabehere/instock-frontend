import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "../src/pages/HomePage/HomePage.jsx"

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />} />
        <Route path="/warehouses/add" element={<WarehouseFormPage />} />
        <Route path="/warehouses/edit" element={<WarehouseFormPage />} />
        <Route path="/inventories" element={<InventoriesListPage />} />
        <Route path="/inventories/:inventoryId" element={<InventoryDetailsPage />} />
        <Route path="/inventories/add" element={<InventoriesFormPage />} />
        <Route path="/inventories/edit" element={<InventoriesFormPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App
