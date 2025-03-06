import InventoriesFormDetails from "../../components/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock";
import InventoriesFormHeader from "../../components/InventoriesFormHeader";

export default function InventoriesFormPage() {
  return (
    <>
      <InventoriesFormHeader />
      <InventoriesFormDetails />
      <InventoriesFormStock />
    </>
  );
}
