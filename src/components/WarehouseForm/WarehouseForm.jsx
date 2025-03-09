import WarehouseFormHeader from "../WarehouseFormHeader/WarehouseFormHeader";
import WarehouseFormDetails from "../WarehouseFormDetails/WarehouseFormDetails";
import "./WarehouseForm.scss";
import { useParams } from "react-router-dom";

function WarehouseForm() {
  const { warehouseId } = useParams();
  return (
    <section className="warehouse-form">
      <WarehouseFormHeader />
      <WarehouseFormDetails warehouseId={warehouseId} />
    </section>
  );
}

export default WarehouseForm;
