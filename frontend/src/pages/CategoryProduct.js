import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import SummaryApi from '../common';

const CategoryProduct = () => {
  // get category name from url
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const categoryNameArray = urlSearch.getAll('category');
  // make object from category name
  const categoryNameObject = {}
  // make object from array
  categoryNameArray.forEach((item) => { categoryNameObject[item] = true })
  // state for products
  const [data, setData] = useState([])
  // state for loading
  const [loading, setLoading] = useState(false)
  // state for array of selected category
  const [filterCategoryList, setFilterCategoryList] = useState([])
  // state for sort by price
  const [sortBy, setSortBy] = useState('') 
  // state for selected category
  const [selectedCategory, setSelectedCategory] = useState(categoryNameObject)
  //  get context
  const { fetchCountAddToCartProduct } = useContext(Context);
  // navigate need chenge category in url
  const navigate = useNavigate();
  // refresh couter add to cart
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchCountAddToCartProduct();
  }
  // set selected category
  const handleSelectedCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectedCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }
  // get array of selected category
  useEffect(() => {
    // get array from object key
    const arrayOfCategory = Object.keys(selectedCategory).map((item) => {
      // check item is true
      if (selectedCategory[item]) {
        // return item if true
        return item
      }
      // return null if item is false
      return null
      // filter onle try item
    }).filter((item) => item)
    // set array to state
    setFilterCategoryList(arrayOfCategory)
    // format url chenge when cehange checkbox
    const urlFormat = arrayOfCategory.map((item, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        //  if last item or only one then write without &&
        return `category=${item}`
      }
      // if not last item then write with &&
      return `category=${item}&&`
    })
    // write item urlFormat in url
    navigate("/product-category?" + urlFormat.join(""))
  }, [selectedCategory])
  // fetch data from backend for category change
  const fetchCategoryWiseData = async () => {
    // req and res from backend
    const dataResponse = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ category: filterCategoryList })
    })
    const dataApi = await dataResponse.json();
    // set data to state
    setData(dataApi?.data);
  }
  // sort by price
  const handleSortByPrice = (e) => {
    const { value } = e.target;
    setSortBy(value)
    if (value === "asc") {
      setData(data.sort((a, b) => a.selling - b.selling))
    } else if (value === "dsc") {
      setData(data.sort((a, b) => b.selling - a.selling))
    }
  }
  // useEffect for refresh sort
  useEffect(() => {}, [sortBy])
  // useEffect for category change
  useEffect(() => {
    // activate loading
    setLoading(true);
    // req and res from backend
    fetchCategoryWiseData()
    // deactivate loading
    setLoading(false);
  }, [filterCategoryList])

  return (
    <div className='container mx-auto p-4'>
      {/* disktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* search panel */}
        <div className='bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll'>
          {/* Sort by price */}
          <div className=''>
            {/* header */}
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>
              Sort By
            </h3>
            {/* sort by price */}
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" value={"asc"} onChange={handleSortByPrice} checked={sortBy === "asc"}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" value={"dsc"} onChange={handleSortByPrice} checked={sortBy === "dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter by category */}
          <div className=''>
            {/* header */}
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>
              Category
            </h3>
            {/* sort by category */}
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((item, index) => (
                  <div key={index + "category"} className='flex items-center gap-3'>
                    <input
                      type="checkbox"
                      name={"category"}
                      id={item?.value}
                      onChange={handleSelectedCategory}
                      value={item?.value}
                      checked={selectedCategory[item?.value]} />
                    <label htmlFor={item?.value}>{item?.labal}</label>
                  </div>
                ))
              }
            </form>
          </div>
        </div>
        {/* product list */}
        <div>
          {/* loading */}
          {
            loading && (
              <div className='text-lg text-center text-slate-400 animate-pulse'>Loading...</div>
            )
          }
          {/* serch result if data > 0 */}
          <div className='min-h-[calc(100vh-150px)] overflow-y-scroll max-h-[calc(100vh-150px)]'>
            {
              !loading && data?.length > 0 && (
                <div
                  className='grid grid-cols-[repeat(auto-fit,minmax(280px,300px))]
                            justify-center md:justify-around md:gap-4 overflow-x-scroll
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
        </div>
      </div>
      {/* mobile version */}
      <div className='grid lg:hidden '>
        {/* search panel */}
        <div className='bg-white p-2 h-28 overflow-y-scroll'>
          {/* Sort by price */}
          <div className=''>
            {/* header */}
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>
              Sort By
            </h3>
            {/* sort by price */}
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" value={"asc"} onChange={handleSortByPrice} checked={sortBy === "asc"}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" value={"dsc"} onChange={handleSortByPrice} checked={sortBy === "dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter by category */}
          <div className=''>
            {/* header */}
            {/* <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>
              Category
            </h3> */}
            {/* sort by category */}
            {/* <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((item, index) => (
                  <div key={index + "category"} className='flex items-center gap-3'>
                    <input
                      type="checkbox"
                      name={"category"}
                      id={item?.value}
                      onChange={handleSelectedCategory}
                      value={item?.value}
                      checked={selectedCategory[item?.value]} />
                    <label htmlFor={item?.value}>{item?.labal}</label>
                  </div>
                ))
              }
            </form> */}
          </div>
        </div>
        {/* product list */}
        <div>
          {/* loading */}
          {
            loading && (
              <div className='text-lg text-center text-slate-400 animate-pulse'>Loading...</div>
            )
          }
          {/* serch result if data > 0 */}
          <div className='min-h-[calc(100vh-150px)] overflow-y-scroll max-h-[calc(100vh-150px)]'>
            {
              !loading && data?.length > 0 && (
                <div
                  className='grid grid-cols-[repeat(auto-fit,minmax(280px,300px))]
                            justify-center md:justify-around md:gap-4 overflow-x-scroll
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
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct