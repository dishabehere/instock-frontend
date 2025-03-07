import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormHeader from "../../components/InventoriesFormHeader/InventoriesFormHeader";
import InventoriesFormFooter from "../../components/InventoriesFormFooter/InventoriesFormFooter";
import { useParams } from "react-router-dom";
import "./InventoriesFormPage.scss"

export default function InventoriesFormPage() {
  const { id } = useParams();
  return (
    <section className="inventoryForm">
      <InventoriesFormHeader />
      <div className= "inventoryForm__main">
      <InventoriesFormDetails id={id} />
      <InventoriesFormStock id={id}/>
      </div>
      <InventoriesFormFooter />
      </section>
  );
}
