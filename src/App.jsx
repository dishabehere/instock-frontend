import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InventoriesListPage from "./pages/InventoriesListPage/InventoriesListPage";
import InventoriesDetailsPage from "./pages/InventoriesDetailsPage/InventoriesDetailsPage";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import InventoriesFormPage from "./pages/InventoriesFormPage/InventoriesFormPage.jsx"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />}/>
        <Route path="/warehouses/add" element={<WarehouseFormPage />} /> 
        <Route path="/warehouses/:warehouseId/edit" element={<WarehouseFormPage />} />
        <Route path="/inventories" element={<InventoriesListPage />} />
        <Route
          path="/inventories/:id"
          element={<InventoriesDetailsPage />}
        />
        <Route path="/inventories/add" element={<InventoriesFormPage />} />
        <Route path="/inventories/:id/edit" element={<InventoriesFormPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
