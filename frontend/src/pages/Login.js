import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const navigate = useNavigate();
    // context for get user details wen user login
    const { fetchUserDetails, fetchCountAddToCartProduct } = useContext(Context);
    // show password
    const [showPassword, setShowPassword] = useState(false);
    // login form input
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    // data from input form
    const handleOnChenge = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    // send data to backend and preventDefoult and response get from backend
    const handleSubmit = async (e) => {
        // need for no reload page and send data in http:// !!!!!
        e.preventDefault();
        // send data to backend
        const dataResponse = await fetch(SummaryApi.singIn.url, {
            method: SummaryApi.singIn.method,
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        // response get from backend
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast.success(dataApi.message, { theme: "colored" })
            navigate("/")
            fetchUserDetails()
            fetchCountAddToCartProduct()
        }
        if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
    }

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    {/* login icon */}
                    <div className='mx-auto w-20 h-20 mb-2'>
                        <img src={loginIcon} alt='login' className='rounded-full' />
                    </div>
                    {/* login form */}
                    <form className='mt-6' onSubmit={handleSubmit}>
                        {/* email */}
                        <div className='grid'>
                            <label>Email : </label>
                            {/* input */}
                            <div className='bg-slate-100 p-1'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='email'
                                    onChange={handleOnChenge}
                                    value={data.email} />
                            </div>
                        </div>
                        {/* password & eye icon & forgot password */}
                        <div className='mt-1'>
                            <label>Password : </label>
                            {/* input & eye icon */}
                            <div className='bg-slate-100 p-1 flex'>
                                {/* input */}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='password'
                                    onChange={handleOnChenge}
                                    value={data.password} />
                                {/* eye icon */}
                                <div className='text-xl cursor-pointer'>
                                    {
                                        showPassword ? (
                                            <span onClick={() => setShowPassword(false)}><FaEyeSlash /></span>
                                        ) : (
                                            <span onClick={() => setShowPassword(true)}><FaEye /></span>
                                        )
                                    }
                                </div>
                            </div>
                            {/* forgot password */}
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:text-red-600 mt-1'>
                                Forgot Password ?
                            </Link>
                        </div>
                        {/* login button */}
                        <button className='bg-red-600 w-full text-white py-2 mt-4 rounded-full block
                            hover:bg-red-700 hover:scale-110 max-w-[150px] transition-all mx-auto'>
                            Login
                        </button>
                    </form>
                    {/* register */}
                    <p className='mt-5'>
                        Don't have account ?
                        <Link to={'/sign-up'} className='text-red-600 hover:text-red-700'> Sign Up</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login