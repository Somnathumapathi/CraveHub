import FloatingAB from "@/components/floatingab"
import MerchantOrders from "../../components/merchantOrders"
import MerchantItems from "../../components/merchantItems"
const MerchantPage = () => {
    return (
        <div>
            <div className=" pt-3">
            <h1 className="flex items-center justify-center text-4xl font-bold w-3/4 pl-2 duration-300 text-green-600 hover:text-green-500 mb-4">Merchant Page</h1></div>
        <MerchantOrders/>
        <MerchantItems/>
            <FloatingAB text={"Add Item"} navPage={"additemPage"}/>
        </div>

    )
}
export default MerchantPage