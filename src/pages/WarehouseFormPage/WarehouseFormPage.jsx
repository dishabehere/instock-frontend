import WarehouseFormHeader from "../../components/WarehouseFormHeader/WarehouseFormHeader";
import WarehouseFormDetails from "../../components/WarehouseFormDetails/WarehouseFormDetails";
import "./WarehouseFormPage.scss";
import { useParams } from "react-router-dom";

function warehouseFormPage() {
  const { warehouseId } = useParams();
  return (
    <section className="warehouse-form">
      <WarehouseFormHeader />
      <WarehouseFormDetails warehouseId={warehouseId} />
    </section>
  );
}

export default warehouseFormPage;
