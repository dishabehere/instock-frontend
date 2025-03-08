import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import "./InventoriesFormPage.scss";
import { createInventoryItem, updateInventoryItem } from "../../utils/apiUtils";

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
    if (
      formData.status === "instock" &&
      (formData.quantity === "" || formData.quantity <= 0)
    )
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

        const formattedData = {
          item_name: formData.item_name.trim(),
          description:formData.description.trim(),
          category: formData.category.trim(),
          status: formData.status.trim(),
          quantity: formData.quantity.trim(),
          warehouse_name: formData.warehouse_name.trim(),
        };

        await createInventoryItem(formattedData);
      } else {
        await updateInventoryItem(id, formattedData);
      }
      navigate("/inventories");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    navigate("/inventories");
  };

  return (
    <section className="inventoryForm">
      <InventoriesFormTitle />
      <form onSubmit={handleSubmit}>
        <div className="inventoryForm__main">
          <InventoriesFormDetails
            id={id}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          <InventoriesFormStock
            id={id}
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        </div>
        <InventoriesFormButtons handleCancel={handleCancel} />
      </form>
    </section>
  );
}
