import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/warehouses`, formData);
        setFormData({
          warehouseName: "",
          streetAddress: "",
          city: "",
          country: "",
          contactName: "",
          position: "",
          phoneNumber: "",
          email: "",
        });
        setSubmitted(false);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      warehouseName: "",
      streetAddress: "",
      city: "",
      country: "",
      contactName: "",
      position: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit} noValidate className="form__form"> 
        <div className="form__details">
            <div className="form__fields form__fields--modified">  
                <h2 className="form__heading">Warehouse Details</h2>
                <div className="form__field">
                    <h3 className="form__label">Warehouse Name</h3>
                    <input className="form__input" placeholder="Warehouse Name" type="text" name="warehouseName" value={formData.warehouseName} onChange={handleChange} />
                    {submitted && errors.warehouseName && <span className="error">{errors.warehouseName}</span>}
                    
                    <h3 className="form__label">Street Address</h3>
                    <input className="form__input" placeholder="Street Address" type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
                    {submitted && errors.streetAddress && <span className="error">{errors.streetAddress}</span>}
                    
                    <h3 className="form__label">City</h3>
                    <input className="form__input" placeholder="City" type="text" name="city" value={formData.city} onChange={handleChange} />
                    {submitted && errors.city && <span className="error">{errors.city}</span>}
                
                    <h3 className="form__label">Country</h3>
                    <input className="form__input" placeholder="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
                    {submitted && errors.country && <span className="error">{errors.country}</span>}
                </div>
            </div>

            <div className="form__fields">
                <h2 className="form__heading">Contact Details</h2>
                <div className="form__field">
                    <h3 className="form__label">Contact Name</h3>
                    <input className="form__input" placeholder="Contact Name" type="text" name="contactName" value={formData.contactName} onChange={handleChange} />
                    {submitted && errors.contactName && <span className="error">{errors.contactName}</span>}
                    
                    <h3 className="form__label">Position</h3>
                    <input className="form__input" placeholder="Position" type="text" name="position" value={formData.position} onChange={handleChange} />
                    {submitted && errors.position && <span className="error">{errors.position}</span>}
                    
                    <h3 className="form__label">Phone Number</h3>
                    <input className="form__input" placeholder="Phone Number" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {submitted && errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    
                    <h3 className="form__label">Email</h3>
                    <input className="form__input" placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                    {submitted && errors.email && <span className="error">{errors.email}</span>}
                </div>
            </div>
        </div>

        <div className="form__buttons">
          <button type="button" className="form__button form__button--cancel" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="form__button form__button--submit">+ Add Warehouse</button>
        </div>
      </form>
    </section>
  );
}

export default WarehouseFormDetails;
