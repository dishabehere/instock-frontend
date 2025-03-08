import { Link } from "react-router-dom"
import "./WarehouseDetails.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";

function WarehouseDetails({ warehouse }) {
  return (
      <div className="warehouse-details">
        <div className="warehouse-list__name">
          <div className="warehouse-details__home-name">
           <Link to="/">
              <img className="warehouse-details__home-icon" src={arrowBackIcon} alt="Arrow Image Icon" />
            </Link>
            <h1 className="warehouse-details__name">{warehouse.warehouse_name}</h1>
          </div>
          <div className="warehouse-details__edit-container">
            <Link className="warehouse-details__edit-link" to={`/warehouses/${warehouse.warehouse_id}/edit`}>
            <img className="warehouse-details__edit-image" src={editIcon} alt="Edit Icon" />
            <p className="warehouse-details__edit-text">Edit</p>
            </Link>
          </div>
        </div>

      <div className="warehouse-details__container">
        <div className="warehouse-details__info">
          <h4 className="warehouse-details__label">Warehouse Address:</h4>
          <p className="warehouse-details__text">
            <span className="warehouse-details__text-address">{warehouse.address},&nbsp;</span>
            <span className="warehouse-details__text-address">{warehouse.city}, {warehouse.country}</span>
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
      </div>
  );
}

export default WarehouseDetails;