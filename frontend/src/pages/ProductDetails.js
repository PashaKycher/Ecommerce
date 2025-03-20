import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
    // navigate to Cart
    const navigate = useNavigate();
    // product state
    const [data, setData] = useState({
        _id: "",
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    });
    // state for active image
    const [activeImage, setActiveImage] = useState(0);
    // state for zoom cordinates
    const [zoomImageCordinates, setZoomImageCordinates] = useState({ x: 0, y: 0 });
    // open zoom image
    const [zoomImage, setZoomImage] = useState(false);
    // loading state
    const [loading, setLoading] = useState(true);
    // loading array image
    const productImageLoading = new Array(4).fill(null);
    // get id product from params
    const params = useParams();
    //  get context
    const { fetchCountAddToCartProduct } = useContext(Context);
    // refresh couter add to cart
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchCountAddToCartProduct();
    }
    // button buy
    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchCountAddToCartProduct();
        navigate("/cart")
    }
    // fetch data from backend and set to state 
    const fetchProductDetails = async () => {
        // activate loading
        setLoading(true);
        // send to backend request whith id from params
        const dataResponse = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ productId: params?.id })
        })
        // response with product get from backend
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            // deactivate loading
            setLoading(false);
            setData(dataApi.data)
        }
        if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
    }
    // zoom image when mause on image
    const handleZoomImage = useCallback((e) => {
        // open zoom
        setZoomImage(true);
        // get cordinates mouse
        const { left, top, width, height } = e.target.getBoundingClientRect();
        // get cordinates image
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        // set cordinates
        setZoomImageCordinates({ x, y });
    }, [zoomImageCordinates]);
    // close zoom image
    const hendleCloseZoomImage = () => {
        setZoomImage(false);
    }
    useEffect(() => {
        fetchProductDetails();
    }, [params?.id])

    return (
        <div className='container mx-auto p-4'>
            {/* image and ditails */}
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-6'>
                {/* image reletive and image galery and zoom */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-2'>
                    {/* loading and reletive image and zoom */}
                    {
                        loading ? (
                            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 animate-pulse'>
                            </div>
                        ) : (
                            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                                <img
                                    src={data.productImage[activeImage]}
                                    alt={data.productName}
                                    className='w-full h-full object-scale-down mix-blend-multiply'
                                    onMouseMove={handleZoomImage}
                                    onMouseLeave={hendleCloseZoomImage}
                                />
                                {/* zoom */}
                                {
                                    zoomImage && (
                                        <div className='hidden absolute min-w-[600px] min-h-[400px] bg-slate-200
                                                    -right-[610px] top-0 p-1 lg:block overflow-hidden'>
                                            <div
                                                className='w-full h-full mix-blend-multiply min-h-[400px] 
                                                        min-w-[600px]'
                                                style={{
                                                    backgroundImage: `url(${data.productImage[activeImage]})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: `${zoomImageCordinates.x * 100}% 
                                                                            ${zoomImageCordinates.y * 100}%`,
                                                }}></div>
                                        </div>)
                                }
                            </div>
                        )
                    }
                    {/* loading and image galery */}
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageLoading.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='w-20 h-20 rounded bg-slate-200 animate-pulse'>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full 
                                                cursor-pointer'>
                                    {
                                        data?.productImage?.map((item, index) => {
                                            return (
                                                <div
                                                    key={index + item}
                                                    className='w-20 h-20 rounded bg-slate-200 p-1'
                                                >
                                                    <img
                                                        src={item}
                                                        alt={data.productName}
                                                        className='w-full h-full object-scale-down mix-blend-multiply'
                                                        onMouseEnter={() => setActiveImage(index)}
                                                        onClick={() => setActiveImage(index)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* loading and ditails (ditails and rating and button) */}
                {
                    loading ? (
                        <div className='flex flex-col gap-1'>
                            <p className='bg-slate-200 animate-pulse h-6 w-52 rounded-full'></p>
                            <h2 className='bg-slate-200 animate-pulse h-6 w-52 rounded-full'></h2>
                            <p className='bg-slate-200 animate-pulse h-6 w-52 rounded-full'></p>
                            {/* rating */}
                            <div className='bg-slate-200 animate-pulse h-4 w-52 rounded-full'>
                            </div>
                            {/* price */}
                            <div className='flex gap-2 items-center text-xl font-medium my-1'>
                                <p className='bg-slate-200 animate-pulse h-8 w-28 rounded-full'></p>
                                <p className='bg-slate-200 animate-pulse h-8 w-28 rounded-full'></p>
                            </div>
                            {/* add to cart and buy */}
                            <div className='flex gap-4 my-2'>
                                <button className='bg-slate-200 animate-pulse h-12 w-28 rounded-full'></button>
                                <button className='bg-slate-200 animate-pulse h-12 w-28 rounded-full'></button>
                            </div>
                            {/* description */}
                            <div>
                                <p className='bg-slate-200 animate-pulse h-6 w-52 rounded-full'></p>
                                <p className='bg-slate-200 animate-pulse h-32 w-96 rounded mt-2'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                            <p className='capitalize text-slate-400'>{data?.category}</p>
                            {/* rating */}
                            <div className='flex text-red-600 items-center gap-1'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>
                            {/* price */}
                            <div className='flex gap-2 items-center text-xl font-medium my-1'>
                                <p className='text-red-600'>{displayINRCurrency(data?.selling)}</p>
                                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                            </div>
                            {/* add to cart and buy */}
                            <div className='flex gap-4 my-2'>
                                <button
                                    onClick={(e) => handleBuyProduct(e, data?._id)}
                                    className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] 
                                                text-red-600 hover:border-red-700 font-medium
                                                hover:bg-red-700 hover:text-white '>Buy
                                </button>
                                <button
                                    onClick={(e) => handleAddToCart(e, data?._id)}
                                    className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] 
                                                text-red-600 hover:border-red-700 font-medium
                                                hover:bg-red-700 hover:text-white '>Add To Cart
                                </button>
                            </div>
                            {/* description */}
                            <div>
                                <p className='text-slate-600 font-medium'>Description : </p>
                                <p className='text-slate-400'>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* more product */}
            {
                data.category && (
                    <HorizontalCardProduct category={data?.category} heading={"Recommended Products"} />
                )
            }
        </div>
    )
}

export default ProductDetails