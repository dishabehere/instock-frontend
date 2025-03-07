import { useLocation } from "react-router-dom";
import "./InventoriesFormButtons.scss"

function InventoriesFormFooter() {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  return (
    <>
      <div className="buttons">
        <button className="buttons__cancel">Cancel</button>
        <div className="buttons__submit">
          {isEditPage ? (
            <button className="buttons__save">Save</button>
          ) : (
            <button className="buttons__add">+ Add Item</button>
          )}
        </div>
      </div>
    </>
  );
}

export default InventoriesFormFooter;
