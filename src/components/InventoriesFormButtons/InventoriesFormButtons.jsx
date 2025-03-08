import { useLocation } from "react-router-dom";
import "./InventoriesFormButtons.scss"

function InventoriesFormFooter({ handleSubmit }) {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  return (
    <div className="buttons">
      <button type="button" className="buttons__cancel">Cancel</button>
      <div className="buttons__submit">
        {isEditPage ? (
          <button type="submit" className="buttons__save" onClick={handleSubmit}>Save</button>
        ) : (
          <button type="submit" className="buttons__add" onClick={handleSubmit}>+ Add Item</button>
        )}
      </div>
    </div>
  );
}

export default InventoriesFormFooter;
