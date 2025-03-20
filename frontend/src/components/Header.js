import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../stores/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  // navigate to search page
  const navigate = useNavigate()
  // get couter from context
  const context = useContext(Context)
  // connect to store for get samsing from store
  const user = useSelector(state => state?.user?.user)
  // connect to store for do samsing with store
  const dispatch = useDispatch();
  // hidden admin panel button
  const [menuDisplay, setmenuDisplay] = useState(false)
  // get vale from url
  const searchInput = useLocation()?.search?.split('=')[1]
  // state for search input
  const [search, setSearch] = useState(searchInput || '')
  // logout user
  const hendleLogout = async () => {
    // send to backend
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: "include",
    })
    // response get from backend
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message, { theme: "colored" })
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if (data.error) { toast.error(data.message, { theme: "colored" }) }
  }
  // search product
  const hendleSearch = (e) => {
    const {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate(`/search`)
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        {/* logo button home */}
        <div className=''>
          <Link to={'/'}><Logo width={120} height={65} /></Link>
        </div>
        {/* input search and button search */}
        <div className='hidden md:flex items-center w-full justify-between max-w-sm border 
          rounded-full focus-within:shadow pl-2'>
          {/* input */}
          <input 
            type='text' 
            placeholder='Search product here ...'
            className='w-full outline-none' 
            onChange={hendleSearch}
            value={search}/>
          {/* button search */}
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center 
          rounded-r-full bg-red-600 text-white cursor-pointer hover:bg-red-700'>
            <GrSearch />
          </div>
        </div>
        {/* user icons and admin panel and cart and login */}
        <div className='flex items-center gap-7'>
          {/* user icon and admin panel */}
          <div className='relative flex justify-center'>
            {/* user icon */}
            {
              user?._id && (
                <div onClick={() => setmenuDisplay(!menuDisplay)}
                  className='text-3xl cursor-pointer relative justify-center flex'>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} alt={user?.firstName} className='w-10 h-10 rounded-full' />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }
            {/* admin panel and cart and order */}
            {
              user?._id && menuDisplay && (
                <div className='absolute top-11 bg-white p-2 rounded shadow-lg h-fit hidden md:block'>
                  <nav>
                    {/* admin panel */}
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link 
                          onClick={() => setmenuDisplay(!menuDisplay)}
                          to={'/admin/all-products'}
                          className='whitespace-nowrap  p-2 rounded hidden md:block
                                  hover:text-red-700 hover:bg-slate-100'>Admin panel</Link>
                      )
                    }
                    {/* cart */}
                    <Link 
                      onClick={() => setmenuDisplay(!menuDisplay)}
                      to={'/cart'}
                      className='whitespace-nowrap  p-2 rounded hidden md:block
                                  hover:text-red-700 hover:bg-slate-100'>Cart
                    </Link>
                    {/* order */}
                    <Link 
                      onClick={() => setmenuDisplay(!menuDisplay)}
                      to={'/order'}
                      className='whitespace-nowrap  p-2 rounded hidden md:block
                                  hover:text-red-700 hover:bg-slate-100'>Order
                    </Link>
                  </nav>
                </div>
              )
            }
          </div>
          {/* cart & couter */}
          {
            user?._id && (
              <Link to={'/cart'} className='text-2xl relative'>
                {/* cart */}
                <span><FaShoppingCart /></span>
                {/* couter */}
                <div className='bg-red-600 text-white w-5 h-5 rounded-full flex justify-center items-center p-1
                                  absolute -top-3 -right-3'>
                  <p className='text-xs'>{context?.countAddToCartProduct}</p>
                </div>
              </Link>
            )
          }
          {/* Login & Logout */}
          <div>
            {
              user?._id ? (
                // logout
                <button className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700'
                  onClick={hendleLogout}>
                  Logout
                </button>
              ) : (
                // login
                <Link className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700'
                  to={'/login'}>
                  Login
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header