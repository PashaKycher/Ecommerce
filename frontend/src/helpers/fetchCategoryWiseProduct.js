import SummaryApi from '../common';
   
   // send to backend ruquest and get response with products
    const fetchCategoryWiseProduct = async (category) => {
        // send to backend request 
        const dataResponse = await fetch(SummaryApi.getCategoryWiseProduct.url, {
            method: SummaryApi.getCategoryWiseProduct.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ category : category }),
        })
        // response with products get from backend
        const dataApi = await dataResponse.json();
        return dataApi
    }

    export default fetchCategoryWiseProduct