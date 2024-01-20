import FloatingAB from "@/components/floatingab"
import MerchantOrders from "../../components/merchantOrders"
import MerchantItems from "../../components/merchantItems"
const MerchantPage = () => {
    return (
        <div><h1>Merchant Page</h1>
        <MerchantOrders/>
        <MerchantItems/>
            <FloatingAB text={"Add Item"} navPage={"additemPage"}/>
        </div>

    )
}
export default MerchantPage