import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWarehouse, createWarehouse, updateWarehouse} from "../../utils/apiUtils";
import "./WarehouseFormDetails.scss";
import error from "../../assets/icons/error-24px.svg";

function WarehouseFormDetails({ warehouseId }) {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!isAddPage && warehouseId) {
      const fetchWarehouse = async () => {
        try {
          const data = await getWarehouse(warehouseId);
          setFormData({
            warehouseName: data.warehouse_name || "",
            streetAddress: data.address || "",
            city: data.city || "",
            country: data.country || "",
            contactName: data.contact_name || "",
            position: data.contact_position || "",
            phoneNumber: data.contact_phone || "",
            email: data.contact_email || "",
          });
        } catch (error) {
          console.error("Error fetching warehouse data:", error);
        }
      };
      fetchWarehouse();
    }
  }, [isAddPage, warehouseId]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.warehouseName.trim())
      newErrors.warehouseName = "Warehouse Name is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact Name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";

    const phoneRegex =
      /^(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!formData.phoneNumber.match(phoneRegex))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.match(emailRegex))
      newErrors.email = "Enter a valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      const formattedData = {
        warehouse_name: formData.warehouseName.trim(),
        address: formData.streetAddress.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),
        contact_name: formData.contactName.trim(),
        contact_position: formData.position.trim(),
        contact_phone: formData.phoneNumber.trim(),
        contact_email: formData.email.trim(),
      };

      try {
        if (warehouseId) {
          await updateWarehouse(warehouseId, formattedData);
        } else {
          await createWarehouse(formattedData);
        }

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

        navigate("/");
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleCancel = () => {
    if (isAddPage) {
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
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit} noValidate className="form__container">
        <div className="form__details">
          <div className="form__fields form__fields--modified">
            <h2 className="form__heading">Warehouse Details</h2>
            <div className="form__field">
              <h3 className="form__label">Warehouse Name</h3>
              <input
                className={`form__input ${
                  submitted && errors.warehouseName ? "form__input--error" : ""
                }`}
                placeholder="Warehouse Name"
                type="text"
                name="warehouseName"
                value={formData.warehouseName}
                onChange={handleChange}
              />
              {submitted && errors.warehouseName && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.warehouseName}
                </span>
              )}

              <h3 className="form__label">Street Address</h3>
              <input
                className={`form__input ${
                  submitted && errors.streetAddress ? "form__input--error" : ""
                }`}
                placeholder="Street Address"
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
              />
              {submitted && errors.streetAddress && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.streetAddress}
                </span>
              )}

              <h3 className="form__label">City</h3>
              <input
                className={`form__input ${
                  submitted && errors.city ? "form__input--error" : ""
                }`}
                placeholder="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {submitted && errors.city && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.city}
                </span>
              )}

              <h3 className="form__label">Country</h3>
              <input
                className={`form__input ${
                  submitted && errors.country ? "form__input--error" : ""
                }`}
                placeholder="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {submitted && errors.country && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.country}
                </span>
              )}
            </div>
          </div>

          <div className="form__fields">
            <h2 className="form__heading">Contact Details</h2>
            <div className="form__field">
              <h3 className="form__label">Contact Name</h3>
              <input
                className={`form__input ${
                  submitted && errors.contactName ? "form__input--error" : ""
                }`}
                placeholder="Contact Name"
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
              />
              {submitted && errors.contactName && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.contactName}
                </span>
              )}

              <h3 className="form__label">Position</h3>
              <input
                className={`form__input ${
                  submitted && errors.position ? "form__input--error" : ""
                }`}
                placeholder="Position"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
              {submitted && errors.position && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.position}
                </span>
              )}

              <h3 className="form__label">Phone Number</h3>
              <input
                className={`form__input ${
                  submitted && errors.phoneNumber ? "form__input--error" : ""
                }`}
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {submitted && errors.phoneNumber && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.phoneNumber}
                </span>
              )}

              <h3 className="form__label">Email</h3>
              <input
                className={`form__input ${
                  submitted && errors.email ? "form__input--error" : ""
                }`}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {submitted && errors.email && (
                <span className="form__error">
                  <img
                    className="form__error-icon"
                    src={error}
                    alt="Error Icon"
                  />
                  {errors.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="form__buttons">
          <button
            type="button"
            className="form__button form__button--cancel"
            onClick={handleCancel}
          >
            {" "}
            Cancel
          </button>
          {isAddPage ? (
            <button type="submit" className="form__button form__button--submit">
              + Add Warehouse
            </button>
          ) : (
            <button type="submit" className="form__button form__button--submit">
              Save
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default WarehouseFormDetails;
