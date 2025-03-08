import "./InventoriesFormError.scss"

function InventoriesFormError() {
  return (
    <div className="error">
      <img
        className="error__img"
        src="../src/assets/icons/error-24px.svg"
        alt="error icon"
      />

      <p className="error__text"> This field is required.</p>
      </div>
  );
}

export default InventoriesFormError;
