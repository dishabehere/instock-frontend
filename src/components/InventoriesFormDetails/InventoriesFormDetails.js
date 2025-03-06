function InventoriesFormDetails() {
  return (
    <form>
      <div className="details">
        <h3 className="details__header">Item Details</h3>
        <p className="details__label">Item Name</p>
        <label className="details__fields">
          <input type="text" name="name" className="details__name" />
        </label>
        <p className="details__label">Description</p>
        <label className="details__fields">
          <textarea
            type="text"
            name="description"
            className="details__description"
          />
        </label>
        <p className="details__label">Category</p>
        <div>
        <label className="details__dropdown">
        <select
          name="category"
          className="details__category"
        ></select>
      </label>
        </div>
      </div>
    </form>
  );
}

export default InventoriesFormDetails;
