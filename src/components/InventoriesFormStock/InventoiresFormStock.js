import { useLocation } from "react-router-dom";
import { useState } from "react";

function InventoriesFormStock() {
  const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  const [stockStatus, setStockStatus] = useState("instock");

  const handleStatusChange = (event) => {
    setStockStatus(event.target.value);
  };

  return (
    <form>
      <div className="stock__stock">
        <h2 className="stock__availability">Item Availability</h2>
        <p className="stock__label">Status</p>
        <label className="stock__selector">
          <input
            type="radio"
            name="stock_status"
            value="instock"
            className="stock__instock"
            checked={stockStatus === "instock"}
            onChange={handleStatusChange}
          />
          In stock
        </label>
        <label className="stock__selector">
          <input
            type="radio"
            name="stock_status"
            value="outofstock"
            className="stock__outofstock"
            checked={stockStatus === "outofstock"}
            onChange={handleStatusChange}
          />
          Out of Stock
        </label>
      </div>
      {stockStatus === "instock" && (
        <>
          <p className="stock__quantity">Quantity</p>
          <label className="stock__field">
            <input type="text" name="quantity" className="stock__number" />
          </label>
        </>
      )}

      <p className="stock__label">Warehouse</p>
      <label className="stock__field">
        <select
          name="warehouse"
          className="stock__locations"
          placeholder="Please Select"
        ></select>
      </label>
      <div>Cancel</div>
      <div className="stock__submit">
        {isEditPage ? (
          <div className="stock__save">Save</div>
        ) : (
          <div className="stock__add">+ Add Item</div>
        )}
      </div>
    </form>
  );
}

export default InventoriesFormStock;
