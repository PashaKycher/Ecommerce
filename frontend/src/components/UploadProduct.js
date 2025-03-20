import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, fetchData }) => {
    // product data state 
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    });
    // get url for big image
    const [fullScreenImage, setFullScreenImage] = useState("");
    // close big image
    const [openFullScreen, setOpenFullScreen] = useState(false);
    // velue from input
    const handleOnChenge = (e) => {
        // get value from input
        const { name, value } = e.target;
        // set value to state
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    // upload product image
    const handleUploadImage = async (e) => {
        // get image
        const file = e.target.files[0];
        // upload image to cloudinary and get response (../helpers/uploadImage)
        const uploadImageCloudinery = await uploadImage(file);
        // set image url to state
        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinery.secure_url]
            }
        })
    }
    // delete preview image
    const handleDeleteImage = async (index) => {
        // get copy of state productImage
        const newProductArr = [...data.productImage];
        // delete image from new array
        newProductArr.splice(index, 1);
        // paste new array to state
        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductArr]
            }
        })
    }
    // upload product
    const handleUploadProduct = async (e) => {
        e.preventDefault();
        // send data to backend
        const dataResponse = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
        // response get from backend triger onClose and callFunc
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message, { theme: "colored" })
            onClose()
            fetchData()
        }
        if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
    }

    return (
        <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex items-center justify-center
                        bg-slate-600 bg-opacity-50'>
            <div className='bg-white p-4 rounded w-full h-full max-w-2xl max-h-[80%] overflow-hidden'>
                {/* title and button close */}
                <div className='flex items-center justify-between pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <IoMdClose className='text-2xl cursor-pointer text-red-600 hover:text-red-700'
                        onClick={onClose} />
                </div>
                {/* form upload product */}
                <form className='grid gap-2 p-4 overflow-y-scroll h-full pb-5' onSubmit={handleUploadProduct}>
                    {/* Label product name */}
                    <label htmlFor='productName'>Product Name :</label>
                    {/* Input product name (name = name key in state) */}
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='enter product name'
                        value={data.productName}
                        onChange={handleOnChenge}
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    {/* Label brand name */}
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    {/* Input brand name (name = name key in state) */}
                    <input
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='enter brand name'
                        value={data.brandName}
                        onChange={handleOnChenge}
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    {/* Lebel category name */}
                    <label htmlFor='category' className='mt-3'>Choose Category :</label>
                    {/* selector category (name = name key in state) */}
                    <select
                        name='category'
                        value={data.category}
                        className='p-1 bg-slate-100 border rounded'
                        onChange={handleOnChenge}
                        required
                    >
                        <option value={""}>Select Category</option>
                        {/* productCategory from ../helpers/productCategory */}
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.labal}</option>
                                )
                            })
                        }
                    </select>
                    {/* Lebel product image */}
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    {/* input image && preview product image */}
                    <div className='flex flex-wrap gap-2'>
                        {/* show preview  image and button delete */}
                        {
                            data?.productImage[0] &&
                            (<div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => {
                                    return (
                                        // div for show image and button delete
                                        <div className='relative'>
                                            {/* show image */}
                                            <img
                                                src={el}
                                                key={el + index}
                                                alt='product'
                                                width={80} height={80}
                                                className='bg-slate-100 border cursor-pointer'
                                                onClick={() => {
                                                    setOpenFullScreen(true)
                                                    setFullScreenImage(el)
                                                }}
                                            />
                                            {/* button delete */}
                                            <div className='absolute top-0 right-0 hover:text-red-600 
                                                                cursor-pointer p-1'
                                                onClick={() => handleDeleteImage(index)}>
                                                <MdDelete />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>)
                        }
                        {/* icon and input upload image */}
                        <label htmlFor='uploadImageInput'>
                            <div className='p-2 bg-slate-100 border rounded h-20 w-20 
                                        cursor-pointer flex items-center justify-center'>
                                <div className='text-slate-500 flex items-center justify-center flex-col gap-2'>
                                    <span className='text-xl'><FaCloudUploadAlt /></span>
                                    <p className='text-sm'>Upload</p>
                                    {/* input upload image (id = htmlFor in label) */}
                                    <input
                                        type='file'
                                        id='uploadImageInput'
                                        className='hidden'
                                        onChange={handleUploadImage}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    {/* Label price */}
                    <label htmlFor='price' className='mt-3'>Price :</label>
                    {/* Input price (name = name key in state) */}
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='enter price'
                        value={data.price}
                        onChange={handleOnChenge}
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    {/* Label selling */}
                    <label htmlFor='selling' className='mt-3'>Selling Price:</label>
                    {/* Input selling (name = name key in state) */}
                    <input
                        type='number'
                        id='selling'
                        name='selling'
                        placeholder='enter selling'
                        value={data.selling}
                        onChange={handleOnChenge}
                        className='p-1 bg-slate-100 border rounded'
                        required
                    />
                    {/* Lebel description */}
                    <label htmlFor='description' className='mt-3'>Description :</label>
                    {/* textarea description (name = name key in state) */}
                    <textarea
                        rows={3}
                        type='text'
                        id='description'
                        name='description'
                        placeholder='enter description'
                        value={data.description}
                        onChange={handleOnChenge}
                        className='p-1 bg-slate-100 border rounded h-28'
                    />
                    {/* button upload */}
                    <button className='p-3 py-2 bg-red-600 text-white mt-3 mb-5 hover:bg-red-700'>
                        Upload Product
                    </button>
                </form>
            </div>
            {/* show big image */}
            {
                openFullScreen && <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreen(false)} />
            }

        </div>
    )
}

export default UploadProduct