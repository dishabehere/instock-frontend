import { useLocation } from "react-router-dom";
import "./WarehouseFormHeader.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function WarehouseFormHeader() {
  const location = useLocation();
  const isAddPage = location.pathname.includes("/add");
  return (
    <section className="header">
      <Link to={`/`} className="header__link">
        <img className="header__arrow-icon" src={arrow} alt="Backwards Arrow" />
      </Link>
      {isAddPage ? (
        <h1 className="header__add-warehouse">Add New Warehouse</h1>
      ) : (
        <h1 className="header__edit-warehouse">Edit Warehouse</h1>
      )}
    </section>
  );
}

export default WarehouseFormHeader;
