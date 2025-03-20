import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({ data, fetchData }) => {
    // open edit product
    const [openEditProduct, setOpenEditProduct] = useState(false)

    return (
        // product cart and edit product
        <div>
            {/* product cart */}
            <div className='bg-white p-4 rounded'>
                <div className='w-40'>
                    {/* product image */}
                    <div className='w-32 h-32 flex items-center justify-center mx-auto'>
                        <img src={data?.productImage[0]} alt={data?.productName} className='object-fill h-full' />
                    </div>
                    {/* product name */}
                    <h1 className='text-center text-ellipsis line-clamp-1'>{data?.productName}</h1>
                    {/* product price */}
                    <p className='text-center font-semibold'>
                        {
                            // get formatted price from '../helpers/displayCurrency'
                            displayINRCurrency(data?.price)
                        }
                    </p>
                    {/* edit button and icon */}
                    <div onClick={() => setOpenEditProduct(true)}
                        className='bg-red-600 cursor-pointer py-1 px-2 rounded-full
                        hover:bg-red-700 hover:text-white flex items-center justify-between'>
                        <p className='text-sm pr-1 hover:underline'>edit product</p>
                        <MdModeEditOutline className='' />
                    </div>
                </div>
            </div>
            {/* edit product */}
            {openEditProduct && (
                <AdminEditProduct dataEdit={data} onClose={() => setOpenEditProduct(false)} fetchData={fetchData} />
            )}
        </div>
    )
}

export default AdminProductCart