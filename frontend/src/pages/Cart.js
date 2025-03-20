import React, { useContext, useEffect, useState } from 'react'
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common/index';
import Context from '../context';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const Cart = () => {
    // state for cart
    const [data, setData] = useState([]);
    // state for loading
    const [loading, setLoading] = useState(false);
    // get couter from context
    const context = useContext(Context)
    // array for loading whith count of product
    const loadingArray = new Array(context.countAddToCartProduct).fill(null);
    // request and response from backend
    const fetchData = async () => {
        // req to backend
        const responseApi = await fetch(SummaryApi.allProductCart.url, {
            method: SummaryApi.allProductCart.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
        });
        // res from backend
        const dataApi = await responseApi.json();
        if (dataApi.success) {
            // get data to state
            setData(dataApi?.data);
        }
    }
    // + quantity of product
    const handleIncrement = async (id, qty) => {
        // req to backend
        const responseApi = await fetch(SummaryApi.updateAddToCart.url, {
            method: SummaryApi.updateAddToCart.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ _id: id, quantity: qty + 1 })
        });
        // res from backend and refresh
        const response = await responseApi.json();
        if (response.success) {
            fetchData();
            context.fetchCountAddToCartProduct();
        }
    }
    // - quantity of product
    const handleDecrement = async (id, qty) => {
        // check quantity is greater then 1
        if (qty <= 1) return
        // req to backend
        const responseApi = await fetch(SummaryApi.updateAddToCart.url, {
            method: SummaryApi.updateAddToCart.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ _id: id, quantity: qty - 1 })
        });
        // res from backend and refresh
        const response = await responseApi.json();
        if (response.success) {
            fetchData();
            context.fetchCountAddToCartProduct();
        }
    }
    // delete product from cart
    const handleDeleteProduct = async (id) => {
        const responseApi = await fetch(SummaryApi.deleteAddToCart.url, {
            method: SummaryApi.deleteAddToCart.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ productId: id })
        });
        // res from backend and refresh
        const response = await responseApi.json();
        if (response.success) {
            fetchData();
            context.fetchCountAddToCartProduct();
        }
    }
    // total quantity of product
    const totalQty = data.reduce((acc, item) => acc + item?.quantity, 0);
    // total price of products
    const totalPrice = data.reduce((acc, item) => acc + (item?.productId.selling * item?.quantity), 0);
    // need for show loading and no refresh pages when chenge count of product
    const handleLoading = async () => {
        await fetchData();
    }
    // payment
    const handlePayment = async () => {
        // load stripe
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        // req to backend
        const responseApi = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({cartItems: data})
        })
        // res from backend
        const responseData = await responseApi.json();
        if(responseData?.data?.id){
            // redirect to checkout
            stripePromise.redirectToCheckout({sessionId: responseData?.data?.id})
        }
    }
    useEffect(() => {
        // activate loading
        setLoading(true);
        // get chenge whith no refresh pages
        handleLoading();
        // loading stap
        setLoading(false);
    }, [])

    return (
        <div className='container mx-auto'>
            {/* empty cart */}
            <div>
                {
                    data?.length === 0 && !loading && <h1 className='text-center text-2xl font-bold mt-8'>Cart is empty</h1>
                }
            </div>
            {/* product cart and total product */}
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                {/* product cart */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            <div>
                                <div className='text-center text-2xl font-bold mt-8 animate-pulse text-slate-400'>
                                    Loading...
                                </div>
                                {loadingArray.map((item, index) => (
                                    <div
                                        key={index + "AddToCartProductLoading"}
                                        className='w-full bg-slate-200 h-32 my-2 border border-slate-400
                                            animate-pulse mt-4 rounded'></div>
                                ))}
                            </div>
                        ) : (data?.map((item, index) => {
                            return (
                                <div
                                    key={index + "AddToCartProduct"}
                                    className='w-full bg-white h-32 my-2 border border-slate-400 mt-4 rounded
                                                grid grid-cols-[128px,1fr] relative'
                                >
                                    {/* product image */}
                                    <Link 
                                        className='w-32 h-[126px] bg-slate-200'
                                        to={`/product/${item?.productId?._id}`}
                                    >
                                        <img
                                            src={item?.productId?.productImage[0]}
                                            alt="product"
                                            className='h-full w-full object-scale-down mix-blend-multiply'
                                        />
                                    </Link>
                                    {/* product info and quantity */}
                                    <Link
                                        className='px-4 py-2'
                                        to={`/product/${item?.productId?._id}`}
                                    >
                                        {/* product name */}
                                        <h2 className='text-base lg:text-xl text-ellipsis line-clamp-1'>
                                            {item?.productId?.productName}
                                        </h2>
                                        {/* category */}
                                        <p className='capitalize text-sm text-slate-500'>
                                            {item?.productId?.category}
                                        </p>
                                        {/* price and total price */}
                                        <div className='flex items-center justify-between'>
                                            <p className='text-lg font-medium text-red-600'>
                                                {displayINRCurrency(item?.productId?.selling)}
                                            </p>
                                            <p className='text-lg font-semibold text-slate-600'>
                                                {displayINRCurrency(item?.productId?.selling * item?.quantity)}
                                            </p>
                                        </div>
                                        {/* quantity +/-*/}
                                        <div className='flex items-center gap-3 mt-1'>
                                            {/* - */}
                                            <button
                                                onClick={() => handleDecrement(item?._id, item?.quantity)}
                                                className='border border-red-600 text-red-600 w-6 h-6
                                                            flex justify-center items-center rounded
                                                            hover:bg-red-600 hover:text-white'>
                                                -
                                            </button>
                                            {/* quantity */}
                                            <span>{item?.quantity}</span>
                                            {/* + */}
                                            <button
                                                onClick={() => handleIncrement(item?._id, item?.quantity)}
                                                className='border border-red-600 text-red-600 w-6 h-6
                                                            flex justify-center items-center rounded
                                                            hover:bg-red-600 hover:text-white'>
                                                +
                                            </button>
                                        </div>
                                    </Link>
                                    {/* delete product and total price */}
                                    <div>
                                        {/* delete product */}
                                        <button
                                            onClick={() => handleDeleteProduct(item?.productId)}
                                            className='absolute top-0 right-0 hover:text-red-600 
                                                                cursor-pointer p-2'>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
                {/* total product */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-20 w-full lg:max-w-sm'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-400 animate-pulse rounded
                                            text-center text-2xl text-slate-400 font-semibold'></div>
                                ) : (
                                    <div className='h-36 bg-white rounded'>
                                        <h2 className='text-white bg-red-600 px-4 py-1'>
                                            Summary
                                        </h2>
                                        <div className='flex justify-between items-center px-4 py-1 text-lg text-slate-600'>
                                            <p>Quantity : </p>
                                            <p>{totalQty}</p>
                                        </div>
                                        <div className='flex justify-between items-center px-4 text-lg text-slate-600'>
                                            <p>Total Prise : </p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                        <button
                                            className='bg-blue-600 text-white w-full p-2'
                                            onClick={handlePayment}
                                        >
                                            Payment
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart