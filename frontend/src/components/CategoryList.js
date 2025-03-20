import SummaryApi from '../common';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CategoryList = () => {
    // state for category list
    const [categoryList, setCategoryList] = useState([]);
    // loading
    const [loading, setLoading] = useState(false);
    // create array whith empty element for loading
    const loadingArray = new Array(12).fill(null);
    // send to backend ruquest and get response with category list
    const fetchCategoryList = async () => {
        // loading
        setLoading(true);
        // send to backend ruquest
        const dataResponse = await fetch(SummaryApi.categoryProduct.url, {
            method: SummaryApi.categoryProduct.method,
            credentials: "include",
        })
        // response with category list get from backend
        const dataApi = await dataResponse.json();
        // loading
        setLoading(false);
        // check response is success
        if (dataApi.success) {
            // set user data to state
            setCategoryList(dataApi.data)
        }
        // check response is error
        if (dataApi.error) {
            toast.error(dataApi.message, { theme: "colored" })
        }
    }
    useEffect(() => {
        fetchCategoryList();
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {
                    // loading and link to category page
                    loading ?
                        (
                            // loading
                            loadingArray.map((item, index) => {
                                return (
                                    <div
                                        key={"CategoryListLoading" + index}
                                        className='w-16 h-16 rounded-full overflow-hidden bg-slate-200 
                                                md:w-20 md:h-20 animate-pulse'
                                    >
                                    </div>
                                )
                            })
                        ) : (
                            // category list
                            categoryList.length > 0 && categoryList.map((product, index) => {
                                return (
                                    // link to category product and category image and name
                                    <Link
                                        to={"/product-category?category=" + product?.category}
                                        key={'CategoryList' + index}
                                        className='cursor-pointer'
                                    >
                                        {/* category image */}
                                        <div className='w-16 h-16 rounded-full overflow-hidden bg-slate-200  
                                                    md:w-20 md:h-20 flex items-center justify-center p-4'>
                                            {/* category image */}
                                            <img
                                                src={product?.productImage[0]}
                                                alt={product?.productName}
                                                className='h-full object-scale-down mix-blend-multiply
                                                        hover:scale-125 transition-all'
                                            />
                                        </div>
                                        {/* category name */}
                                        <p className='text-sm text-center md:text-base capitalize'>{product?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryList