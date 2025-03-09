import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import "./InventoriesFormPage.scss";
import {
  getAllWarehouses,
  createInventoryItem,
  updateInventoryItem,
  getInventoryItem,
} from "../../utils/apiUtils";

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
    quantity: "1" ,
    w_name: "",
  });
  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState({});

  useEffect(() => {
    if (location.pathname.includes("/edit") && id) {
      fetchInventoryItem(id);
    }
  }, [id, location.pathname]);

  const fetchInventoryItem = async (id) => {
    try {
      const data = await getInventoryItem(id);
      const status =
        data.status.toLowerCase() === "in stock" ? "instock" : "outofstock";
      setFormData({ ...data, status: status });
    } catch (error) {
      console.error("Error fetching inventory item:", error);
    }
  };

  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const data = await getAllWarehouses();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching Warehouse", error);
      }
    }
    fetchWarehouses();
  }, []);

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
      !formData.warehouse_name ||
      formData.warehouse_name === "Please select"
    )
      newErrors.warehouse_name = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }
    const warehouse = warehouses.find((warehouse) => {
      return warehouse.warehouse_name === formData.warehouse_name;
    });

    let status = "";
    if (formData.status === "instock") {
      status = "In Stock";
    } else {
      status = "Out of Stock";
      formData.quantity = 0;
    }

    try {
      const formattedData = {
        item_name: formData.item_name.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        status: status,
        quantity: formData.quantity,
        warehouse_id: warehouse.id,
      };

      if (location.pathname.includes("/add")) {
        const result = await createInventoryItem(formattedData);
      } else {
        const result = await updateInventoryItem(id, formattedData);
      }

      navigate("/inventories");
    } catch (error) {
      console.error("Error in try block of handleSubmit:", error);
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
