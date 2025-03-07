import { Link } from "react-router-dom"
import "./WarehouseDetails.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

function WarehouseDetails({ warehouse }) {
  return (
    <section className="warehouse-list">
      <div className="warehouse-details">
        <div className="warehouse-list__name">
          <Link to="/">
            <img className="warehouse-details__home-icon" src={arrowBackIcon} alt="Arrow Image Icon" />
          </Link>
          <h1 className="warehouse-details__name">{warehouse.warehouse_name}</h1>
          <img className="warehouse-details__right-image" src={editIcon} alt="Edit Icon" />
        </div>

        <div className="warehouse-details__info">
          <h4 className="warehouse-details__label">Warehouse Address:</h4>
          <p className="warehouse-details__label">{warehouse.address}</p>
          <p className="warehouse-details__label">
            {warehouse.city}, {warehouse.country}
          </p>
        </div>

        <div className="warehouse-details__content warehouse-details__content--contact">
          <div className="warehouse-details__info">
            <h4 className="warehouse-details__label">Contact Name:</h4>
            <p className="warehouse-details__text">{warehouse.contact_name}</p>
            <p className="warehouse-details__text">{warehouse.contact_position}</p>
          </div>

          <div className="warehouse-details__info">
            <h4 className="warehouse-details__label">Contact Information:</h4>
            <p className="warehouse-details__text">{warehouse.contact_phone}</p>
            <p className="warehouse-details__text">{warehouse.contact_email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WarehouseDetails;