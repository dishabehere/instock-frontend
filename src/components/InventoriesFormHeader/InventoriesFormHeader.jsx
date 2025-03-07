import { useLocation, Link } from 'react-router-dom';
import "./InventoriesFormHeader.scss"

function InventoriesFormHeader() {
  const location = useLocation();
  const isEditPage = location.pathname.includes('/edit');

  return (
    <section className="form__header">
      <Link to="/inventories">
        <img
          className="form__img"
          src="/src/assets/icons/arrow_back-24px.svg"
          alt="arrow-icon"
        />
      </Link>
      <h2 className={`form__title ${isEditPage ? 'form__title--edit' : 'form__title--add'}`}>
        {isEditPage ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </h2>
    </section>
  );
}

export default InventoriesFormHeader;
