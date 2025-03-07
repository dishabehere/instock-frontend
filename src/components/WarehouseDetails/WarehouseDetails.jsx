import "./WarehouseDetails.scss";


function WarehouseDetails({ warehouse }) {
  return (
    <div className="warehouse-details">
      <div className="warehouse-details__info">
        <h4 className="warehouse-details__label">Warehouse Address:</h4>
        {/* <p className="warehouse-details__label">{warehouse.address}</p> */}
        <p className="warehouse-details__label">
          {warehouse.city}
          {warehouse.country}
        </p>
      </div>

      <div className="warehouse-details__content warehouse-details__content--contact">
        <div className="warehouse-details__info">
          <h4 className="warehouse-details__label">Contact Name:</h4>
          <p className="warehouse-details__text">{warehouse.contact_name}</p>
          <p className="warehouse-details__text">
            {warehouse.contact_position}
          </p>
        </div>

        <div className="warehouse-details__info">
          <h4 className="warehouse-details__label">Contact Information:</h4>
          <p className="warehouse-details__text">{warehouse.contact_phone}</p>
          <p className="warehouse-details__text">{warehouse.contact_email}</p>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetails;
