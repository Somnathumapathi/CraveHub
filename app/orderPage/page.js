import AppBar from "../../components/appbar";


const OrderPage = () => {
    return (
        <div>
<AppBar pageName="Order" />
<center>
<h1 className='text-3xl text-green-500'>My bowl</h1><br/>
<img className="w-96" src="https://img.taste.com.au/gpe52rFs/taste/2017/09/easy-beef-and-quinoa-salad-bowl-130828-2.jpg"></img><br/>
<div className="bg-neutral-600 w-[200px] h-[200px] rounded-lg hover:bg-green-800 hover:scale-105 duration-300">
    <h2>Nutritional Info:</h2>

</div><br/>
<h2>Add Items</h2>
</center>
        </div>
        
    )
}
export default OrderPage