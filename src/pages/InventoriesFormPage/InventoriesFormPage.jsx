import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import InventoriesFormError from "../../components/InventoriesFormError/InventoriesFormError";
import "./InventoriesFormPage.scss";

export default function InventoriesFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "instock",
    quantity: "",
    warehouse_name: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.item_name.trim() === "") newErrors.item_name = true;
    if (formData.description.trim() === "") newErrors.description = true;
    if (formData.category === "" || formData.category === "Please Select")
      newErrors.category = true;
    if (formData.status === "") newErrors.status = true;
    if (formData.status === "instock" && formData.quantity === "")
      newErrors.quantity = true;
    if (
      formData.warehouse_name === "" ||
      formData.warehouse_name === "Please select"
    )
      newErrors.warehouse_name = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (location.pathname.includes("/add")) {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/inventories`,
          formData
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`,
          formData
        );
      }
      navigate("/inventories");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="inventoryForm">
      <InventoriesFormTitle />
      <form onSubmit={handleSubmit}>
        <div className="inventoryForm__main">
          <InventoriesFormDetails
            id={id}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          <InventoriesFormStock
            id={id}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        </div>
        <InventoriesFormButtons />
      </form>
    </section>
  );
}
