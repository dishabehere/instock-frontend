import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./WarehouseFormDetails.scss";

function WarehouseFormDetails() {
  const location = useLocation();
  const isAddPage = location.pathname.includes("/add");
  
  const [formData, setFormData] = useState({
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    
    if (!formData.warehouseName.trim()) newErrors.warehouseName = "Warehouse Name is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact Name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber.match(phoneRegex)) newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex)) newErrors.email = "Enter a valid email address";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const submitWarehouse = async () => {
      if (validate()) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/warehouses`, formData);
          console.log("Form submitted successfully", response.data);
        } catch (error) {
          console.error("Error submitting form", error);
        }
      }
    };

    if (Object.keys(errors).length === 0 && Object.values(formData).some(value => value.trim() !== "")) {
      submitWarehouse();
    }
  }, [formData]);

  return (
    <section className="form">
      <h2>{isAddPage ? "Add New Warehouse" : "Edit Warehouse"}</h2>
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="form__fields">
          <label>Warehouse Name</label>
          <input type="text" name="warehouseName" value={formData.warehouseName} onChange={handleChange} />
          {errors.warehouseName && <span className="error">{errors.warehouseName}</span>}
          
          <label>Street Address</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
          {errors.streetAddress && <span className="error">{errors.streetAddress}</span>}
          
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <span className="error">{errors.city}</span>}
          
          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div className="form__fields">
          <h3>Contact Details</h3>
          <label>Contact Name</label>
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} />
          {errors.contactName && <span className="error">{errors.contactName}</span>}
          
          <label>Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} />
          {errors.position && <span className="error">{errors.position}</span>}
          
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div className="form__buttons">
          <button type="button" className="cancel">Cancel</button>
          <button type="submit" className="submit">+ Add Warehouse</button>
        </div>
      </form>
    </section>
  );
}

export default WarehouseFormDetails;
