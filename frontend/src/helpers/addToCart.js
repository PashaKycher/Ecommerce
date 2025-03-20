import SummaryApi from '../common';
import { toast } from 'react-toastify';

const addToCart = async(e, data) => {
    e?.stopPropagation();
    e?.preventDefault();
    // send data to backend
    const dataResponse = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({productId: data})
    })
    // response get from backend
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
        toast.success(dataApi.message, { theme: "colored" })
    }
    if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
    return dataApi
}

export default addToCart