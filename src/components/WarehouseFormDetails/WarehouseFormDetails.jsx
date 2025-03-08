import { useLocation } from "react-router-dom";
import "./WarehouseFormDetails.scss"

function WarehouseFormDetails() {
    const location = useLocation();
    const isAddPage = location.pathname.includes("/add");
    return(
        <section className="form">
            <section className="form__fields">
                <div>

                </div>
            </section>

        </section>
);
}

export default WarehouseFormDetails;   