import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormHeader from "../../components/InventoriesFormHeader/InventoriesFormHeader";
import { useParams } from "react-router-dom";
import "./InventoriesFormPage.scss"

export default function InventoriesFormPage() {
  const { id } = useParams();
  return (
    <section className="inventoryForm">
      <InventoriesFormHeader />
      <InventoriesFormDetails id={id} />
      <InventoriesFormStock id={id}/>
      </section>
  );
}
