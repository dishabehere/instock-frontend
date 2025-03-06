import InventoriesFormDetails from "../../components/InventoriesFormDetails/InventoriesFormDetails";
import InventoriesFormStock from "../../components/InventoriesFormStock/InventoiresFormStock";
import InventoriesFormHeader from "../../components/InventoriesFormHeader/InventoriesFormHeader";

export default function InventoriesFormPage() {
  return (
    <>
      <InventoriesFormHeader />
      <InventoriesFormDetails />
      <InventoriesFormStock />
    </>
  );
}
