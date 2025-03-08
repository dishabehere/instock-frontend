import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import { useParams } from "react-router-dom";
import {useState} from "react";
import "./InventoriesFormPage.scss";

export default function InventoriesFormPage() {
  const { id } = useParams();
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "" || formData[key] === "Please Select") {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors");
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
        <InventoriesFormButtons handleSubmit={handleSubmit} />
      </form>
    </section>
  );
}
