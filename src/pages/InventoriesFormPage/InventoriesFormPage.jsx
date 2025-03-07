import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoriesFormStock";
import InventoriesFormHeader from "../../components/InventoriesFormHeader/InventoriesFormHeader";
import { useParams } from "react-router-dom";

export default function InventoriesFormPage() {
  const { id } = useParams();
  return (
    <>
      <InventoriesFormHeader />
      <InventoriesFormDetails id={id} />
      <InventoriesFormStock />
    </>
  );
}
