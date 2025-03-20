import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { setUserDetails } from './stores/userSlice';
import { useDispatch } from 'react-redux';


function App() {
  // connect to store for do samsing with store
  const dispatch = useDispatch();
  // state for count of products in cart
  const [countAddToCartProduct, setCountAddToCartProduct] = useState(0);
  // send to backend ruquest whith cookies-"Token" and get response with user details
  const fetchUserDetails = async () => {
    // send to backend request whith cookies-"Token"
    const dataResponse = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
    })
    // response with user details get from backend
    const dataApi = await dataResponse.json();
    // check response is success
    if(dataApi.success) {
      // set user data to store
      dispatch(setUserDetails(dataApi.data))
    }
  }
  // send to backend request and get response with count of products in cart
  const fetchCountAddToCartProduct = async () => {
    // send to backend request
    const dataResponse = await fetch(SummaryApi.countProduct.url, {
      method: SummaryApi.countProduct.method,
      credentials: "include",
    })
    // response with count of products in cart get from backend
    const dataApi = await dataResponse.json();
    setCountAddToCartProduct(dataApi?.data)
  }
  // get user details wen user login. for this need context
  useEffect(() => {
    // user ditails
    fetchUserDetails()
    // count of products in cart
    fetchCountAddToCartProduct()
  }, [])
  
  return (
    <>
    {/* context for get user details wen user login */}
      <Context.Provider value={{
        fetchUserDetails, // user ditails fetch
        fetchCountAddToCartProduct, // count of products in cart
        countAddToCartProduct 
      }} >
        {/* toast for show message of error */}
        <ToastContainer position='top-center'/>
        {/* header */}
        <Header />
        {/* main, children component of <App /> */}
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        {/* footer */}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
