import { useState , useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import "./InventoriesFormPage.scss";
import { createInventoryItem, updateInventoryItem , getInventoryItem} from "../../utils/apiUtils";

export default function InventoriesFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "instock",
    quantity: "",
    warehouse_name: "",
    warehouse_id:"",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.pathname.includes("/edit") && id) {
      fetchInventoryItem(id);
    }
  }, [id, location.pathname]);

  const fetchInventoryItem = async (id) => {
    try {
      const data = await getInventoryItem(id);
      const status = data.status.toLowerCase() === "in stock" ? "instock" : "outofstock";
      setFormData({...data, status: status,  warehouse_id: data.warehouse_id || 1 });
    } catch (error) {
      console.error("Error fetching inventory item:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     const formattedData = {
  //       item_name: formData.item_name.trim(),
  //       description: formData.description.trim(),
  //       category: formData.category.trim(),
  //       status: formData.status.trim(),
  //       quantity: formData.quantity,
  //       warehouse_name: formData.warehouse_name.trim(),
  //     };
  //     if (location.pathname.includes("/add")) {
  //       await createInventoryItem(formattedData);
  //     } else {
  //       await updateInventoryItem(id, formattedData);
  //     }
  //     navigate("/inventories");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    console.log("handleSubmit function called");
    e.preventDefault();
    setIsSubmitted(true)
    console.log("Form data before validation:", formData);
    
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    console.log("Form validation passed");
  
    try {
      console.log("Formatting data");
      const formattedData = {
        item_name: formData.item_name.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        status: formData.status.trim(),
        quantity: formData.quantity,
        warehouse_name: formData.warehouse_name.trim(),
        warehouse_id:formData.warehouse_id,
      };
      console.log("Formatted data:", formattedData);
  
      if (location.pathname.includes("/add")) {
        console.log("Adding new inventory item");
        const result = await createInventoryItem(formattedData);
        console.log("Create result:", result);
      } else {
        console.log("Updating inventory item with id:", id);
        const result = await updateInventoryItem( id, formattedData);
        console.log("Update result:", result);
      }
      
      console.log("Operation successful, navigating to /inventories");
      navigate("/inventories");
    } catch (error) {
      console.error("Error in try block of handleSubmit:", error);
      console.log("Error details:", error.response?.data);
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
