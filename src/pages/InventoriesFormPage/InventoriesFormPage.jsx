import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormTitle from "../../components/InventoriesFormTitle/InventoriesFormTitle";
import InventoriesFormButtons from "../../components/InventoriesFormButtons/InventoriesFormButtons";
import { useParams } from "react-router-dom";
import "./InventoriesFormPage.scss"

export default function InventoriesFormPage() {
  const { id } = useParams();
  return (
    <section className="inventoryForm">
      <InventoriesFormTitle />
      <div className= "inventoryForm__main">
      <InventoriesFormDetails id={id} />
      <InventoriesFormStock id={id}/>
      </div>
      <InventoriesFormButtons />
      </section>
  );
}
