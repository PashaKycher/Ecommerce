import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SingUp = () => {
    const navigate = useNavigate();
    // show password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    // login form input
    const [data, setData] = useState({
        email: '',
        password: '',
        firstName: '',
        confirmPassword: '',
        profilePic: ''
    });
    // data from input login form
    const handleOnChenge = (e) => {
        // get value
        const { name, value } = e.target;
        // set value to data
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    // data from input profile pic form
    const handleUploadPic = async (e) => {
        // get file
        const file = e.target.files[0];
        // convert to base64
        const imagePic = await imageToBase64(file);
        // set imagePic to data
        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })
    }
    // send data to backend and preventDefoult and response get from backend
    const handleSubmit = async (e) => {
        // need for no reload page and send data in http:// !!!!!
        e.preventDefault();
        // validation password
        if (data.password !== data.confirmPassword) {
            toast.error("Password check password and confirm password", { theme: "colored" })
            return;
        }
        // send data to backend
        const dataResponse = await fetch(SummaryApi.singUP.url, {
            method: SummaryApi.singUP.method,
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
            navigate("/login")
        }
        if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
    }

    return (
        <section id='singUp'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    {/* form upload profile pic & login icon */}
                    <div className='mx-auto w-20 h-20 relative'>
                        {/* login icon */}
                        <div>
                            <img src={data.profilePic || loginIcon} alt='login' className='rounded-full' />
                        </div>
                        {/* form upload profile pic */}
                        <form>
                            <label>
                                {/* upload profile pic button */}
                                <div className='text-xs bg-slate-200 py-2 text-center absolute bottom-6 cursor-pointer
                                        hover:text-white hover:bg-red-700 w-full rounded-full bg-opacity-80'>
                                    Upload Photo
                                </div>
                                {/* input load profile pic */}
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>
                    {/* form login */}
                    <form className='mt-6' onSubmit={handleSubmit}>
                        {/* name */}
                        <div className='grid mt-2'>
                            <label>First Name : </label>
                            {/* input */}
                            <div className='bg-slate-100 p-1'>
                                <input
                                    type='text'
                                    placeholder='Enter your first name'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='firstName'
                                    onChange={handleOnChenge}
                                    required
                                    value={data.firstName} />
                            </div>
                        </div>
                        {/* email */}
                        <div className='mt-1'>
                            <label>Email : </label>
                            {/* input */}
                            <div className='bg-slate-100 p-1'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='email'
                                    onChange={handleOnChenge}
                                    required
                                    value={data.email} />
                            </div>
                        </div>
                        {/* password & eye icon & forgot password №1*/}
                        <div className='mt-1'>
                            <label>Password : </label>
                            {/* input & eye icon */}
                            <div className='bg-slate-100 p-1 flex'>
                                {/* input */}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='password'
                                    onChange={handleOnChenge}
                                    required
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
                        </div>
                        {/* password & eye icon & forgot password №2*/}
                        <div className='mt-1'>
                            <label>Confirm Password : </label>
                            {/* input & eye icon */}
                            <div className='bg-slate-100 p-1 flex'>
                                {/* input */}
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Enter confirm password'
                                    className='outline-none w-full h-full bg-transparent'
                                    name='confirmPassword'
                                    onChange={handleOnChenge}
                                    required
                                    value={data.confirmPassword} />
                                {/* eye icon */}
                                <div className='text-xl cursor-pointer'>
                                    {
                                        showConfirmPassword ? (
                                            <span onClick={() => setConfirmShowPassword(false)}><FaEyeSlash /></span>
                                        ) : (
                                            <span onClick={() => setConfirmShowPassword(true)}><FaEye /></span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* login button */}
                        <button className='bg-red-600 w-full text-white py-2 mt-4 rounded-full block
                            hover:bg-red-700 hover:scale-110 max-w-[150px] transition-all mx-auto'>
                            Sing Up
                        </button>
                    </form>
                    {/* login */}
                    <p className='mt-5'>
                        You have account ?
                        <Link to={'/login'} className='text-red-600 hover:text-red-700'> Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SingUp