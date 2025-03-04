import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/:warehouseId" element={<WarehouseDetails />} />
        <Route path="/warehouses/:warehouseId/inventories" element={<WarehouseInventories />} />
        <Route path="/inventories/:inventoryId" element={<InventoryDetails />} />
      </Routes>
    </Router>
  );
}

export default App
