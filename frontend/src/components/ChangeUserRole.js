import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({firstName, email, role, onClose, userid, callFunc}) => {
    // role state
    const [userRole, setUserRole] = useState(role)
    // change role in state
    const hendleOnChengeSelector = (e) => {
        setUserRole(e.target.value)
    }
    // change role in backend
    const updateUserRole = async () => {
        try {
            // send data to backend
            const dataResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ userId: userid, role: userRole })
            })
            // response get from backend triger onClose and callFunc
            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                toast.success(dataApi.message, { theme: "colored" })
                onClose()
                callFunc()
            }
            if (dataApi.error) { toast.error(dataApi.message, { theme: "colored" }) }
        } catch (error) { toast.error(error, { theme: "colored" }) }
    }

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-slate-600 bg-opacity-50
                        w-full h-full z-10 flex justify-center items-center'>
            {/* user diteails and role change form */}
            <div className='bg-white p-4 rounded-md shadow-md w-full max-w-sm'>
                {/* close button */}
                <button className='block ml-auto hover:text-red-700' onClick={onClose}>
                    <IoMdClose />
                </button>
                {/* title */}
                <h1 className='text-lg font-medium mb-4'>Change User Diteails</h1>
                {/* user diteails */}
                <p className='flex gap-2'><span className='w-14 block'>Name :</span>{firstName}</p>
                <p className='flex gap-2'><span className='w-14 block'>Email :</span>{email}</p>
                {/* role change form and button save */}
                <div className='flex items-center gap-2'>
                    <p><span className='w-14 block'>Role :</span></p>
                    {/* selektor role */}
                    <select className='border px-4' value={userRole} onChange={hendleOnChengeSelector}>
                        {
                            Object.values(ROLE).map((role, index) => {
                                return <option value={role} key={index}>{role}</option>
                            })
                        }
                    </select>
                    {/* button save role */}
                    <button className='bg-red-600 text-white px-4 rounded-md hover:bg-red-700 ml-auto'
                        onClick={updateUserRole}>
                        Change
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeUserRole