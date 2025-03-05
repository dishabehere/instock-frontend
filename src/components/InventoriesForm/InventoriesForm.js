function InventoriesForm() {
  return (
    <form className="form">
      <div className="form__header">
        <img
          className="form__img"
          src="src/assets/icons/arrow_back-24px.svg"
          alt="arrow-icon"
        ></img>
        <h2 className="form__title--edit">Edit Inventory Item</h2>
        <h2 className="form__title--add"> Add New Inventory Item</h2>
      </div>
      <div className="form__info">
        <h3 className="form__subheader">Item Details</h3>
        <p className="form__label">Item Name</p>
        <input
          type="text"
          name="name"
          className="form__name"
        />
        <p className="form__label">Description</p>
        <textarea
          type="text"
          name="description"
          className="form__description"
        />
      </div>
    </form>
  );
}
