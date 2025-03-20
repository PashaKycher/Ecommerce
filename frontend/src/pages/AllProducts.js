import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AdminProductCart from '../components/AdminProductCart';

const AllProducts = () => {
  // upload product state
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  // 
  const [allProducts, setAllProducts] = useState([])

  // send to backend ruquest  and get response with all products
  const fetchAllProducts = async () => {
    // send to backend request 
    const dataResponse = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      credentials: "include",
    })
    // response with all products get from backend
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setAllProducts(dataApi.data)
    }
    if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      {/* title and button upload product and table all product */}
      <div className='flex items-center bg-white py-2 px-4'>
        {/* title */}
        <h2 className='font-bold text-lg'>All Products</h2>
        {/* button upload product */}
        <button onClick={() => setOpenUploadProduct(true)}
          className='border-2 border-red-600 text-red-600 rounded-full py-1 px-3 ml-auto 
                  hover:bg-red-700 hover:text-white hover:border-red-700 transition-all'>
          Upload Product
        </button>
      </div>
      {/* all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-185px)] overflow-y-scroll'>
        {
          allProducts.map((product, index) => {
            return (
              <AdminProductCart data={product} key={index+"allProduct"} fetchData={fetchAllProducts}/>    
          )})
        }
      </div>
      {/* Window UploadProduct  */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
        )
      }
    </div>
  )
}

export default AllProducts