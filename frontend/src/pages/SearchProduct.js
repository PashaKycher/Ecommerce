import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const SearchProduct = () => {
    // get query from url
    const query = useLocation().search;
    //  get context
    const { fetchCountAddToCartProduct } = useContext(Context);
    // refresh couter add to cart
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchCountAddToCartProduct();
    }
    // state for data
    const [data, setData] = useState([]);
    // state for loading
    const [loading, setLoading] = useState(false);
    // send to backend request whith query
    const fetchSearchProduct = async () => {
        // send to backend request
        const dataResponse = await fetch(SummaryApi.searchProduct.url + query, {
            method: SummaryApi.searchProduct.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
        })
        // response from backend
        const dataApi = await dataResponse.json();
        if(dataApi.data === undefined) return setData([])
        setData(dataApi.data)
    }
    useEffect(() => {
        setLoading(true)
        fetchSearchProduct()
        setLoading(false)
    }, [query])
    return (
        <div className='container mx-auto p-4'>
            {/* loading */}
            {
                loading && (
                    <div className='text-lg text-center text-slate-400 animate-pulse'>Loading...</div>
                )
            }
            {/* data.length */}
            <p className='text-lg font-semibold my-3'>Serch Result : {data.length}</p>
            {/* serch result if data=0 */}
            {
                !loading && data?.length === 0 && (
                    <div className='text-lg text-center text-slate-400'>Get No Result</div>
                )
            }
            {/* serch result if data > 0 */}
            {
                !loading && data?.length > 0 && (
                    <div
                        className='grid grid-cols-[repeat(auto-fit,minmax(280px,300px))]
                                            justify-center md:justify-between md:gap-4 overflow-x-scroll
                                            scrollbar-none transition-all'>
                        {data.map((item, index) => {
                            return (
                                // cart of product
                                <Link
                                    key={index}
                                    to={`/product/${item?._id}`}
                                    className='min-w-[280px] max-w-[280px] md:min-w-[300px] md:max-w-[300px] w-full
                                                bg-white rounded-sm shadow'
                                    onClick={() => window.scrollTo(0, 0)}>
                                    {/* image */}
                                    <div
                                        className='bg-slate-200 h-52 p-4 min-w-[280px] flex justify-center items-center'>
                                        <img
                                            src={item?.productImage[0]}
                                            alt={item?.productName}
                                            className='h-full object-scale-down hover:scale-110 transition-all 
                                                        mix-blend-multiply'
                                        />
                                    </div>
                                    {/* name, category and price */}
                                    <div className='p-4 grid gap-3'>
                                        {/* name */}
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 
                                                        text-black'>
                                            {item?.productName}
                                        </h2>
                                        {/* category */}
                                        <p className='capitalize text-sm text-slate-500'>
                                            {item?.category}
                                        </p>
                                        {/* price */}
                                        <div className='flex gap-3 text-xs'>
                                            {/* sole */}
                                            <p className='text-red-600 font-medium'>
                                                {displayINRCurrency(item?.selling)}
                                            </p>
                                            {/* price */}
                                            <p className='text-slate-500 line-through'>
                                                {displayINRCurrency(item?.price)}
                                            </p>
                                        </div>
                                        {/* button add to cart */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, item?._id)}
                                            className='bg-red-600 text-white py-0.5 px-3 rounded-full 
                                                        hover:bg-red-700 text-sm'>
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default SearchProduct