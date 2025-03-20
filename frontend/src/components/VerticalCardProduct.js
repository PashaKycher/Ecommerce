import React, { useState, useEffect, useRef, useContext } from 'react'
import displayINRCurrency from '../helpers/displayCurrency';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const scrollRef = useRef();
    //  get context
    const { fetchCountAddToCartProduct } = useContext(Context);
    // refresh couter add to cart
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchCountAddToCartProduct();
    }
    // state for products
    const [data, setData] = useState([]);
    // loading state
    const [loading, setLoading] = useState(false);
    // preve data
    const loadingList = new Array(12).fill(null);
    // fetch data from backend and set to state whith funtion from helper
    const fetchData = async () => {
        // activate loading
        setLoading(true);
        // req and res from backend
        const dataApi = await fetchCategoryWiseProduct(category);
        // loading stap
        setLoading(false);
        // get data to state
        setData(dataApi?.data);
    }
    // next image
    const nextImage = () => {
        scrollRef.current.scrollLeft += 300
    }
    // preve image
    const preveImage = () => {
        scrollRef.current.scrollLeft -= 300
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            {/* title */}
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            {/* products and buttons */}
            <div
                className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'
                ref={scrollRef}
            >
                {/* preve button */}
                <button
                    className='bg-white shadow-md rounded-full p-1 absolute text-lg hidden md:block left-0 z-10'
                    onClick={preveImage}
                >
                    <FaAngleLeft />
                </button>
                {/* next button */}
                <button
                    className='bg-white shadow-md rounded-full p-1 absolute text-lg hidden md:block right-0 z-10'
                    onClick={nextImage}
                >
                    <FaAngleRight />
                </button>
                {/* map data products */}
                {
                    loading ?
                        loadingList.map((item, index) => (
                            <div
                                className='min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] w-full
                                             h-52 bg-slate-200 rounded shadow-md animate-pulse'
                                key={index}></div>
                        )) : (
                            data.map((item, index) => {
                                return (
                                    // cart of product
                                    <Link
                                        to={`/product/${item?._id}`}
                                        key={index}
                                        className='min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] w-full
                                                 bg-white rounded-sm shadow'
                                        onClick={() => window.scrollTo(0, 0)}>
                                        {/* image */}
                                        <div
                                            className='bg-slate-200 h-52 p-4 min-w-[280px] flex justify-center items-center'>
                                            <img
                                                src={item?.productImage[0]}
                                                alt={item?.productName}
                                                className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'
                                            />
                                        </div>
                                        {/* name, category and price */}
                                        <div className='p-4 grid gap-3'>
                                            {/* name */}
                                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
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
                            })
                        )
                }
            </div>
        </div>
    )

}

export default VerticalCardProduct