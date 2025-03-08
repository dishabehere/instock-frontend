import WarehouseFormHeader from "../WarehouseFormHeader/WarehouseFormHeader";
import WarehouseFormDetails from "../WarehouseFormDetails/WarehouseFormDetails"
import "./WarehouseForm.scss"

function WarehouseForm() {
    return(
        <section className="warehouse-form">
            <WarehouseFormHeader />
            <WarehouseFormDetails />
        </section>
    );
}

export default WarehouseForm;   