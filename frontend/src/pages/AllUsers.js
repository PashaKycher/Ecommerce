import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  // all users-state
  const [allUsers, setAllUsers] = useState([])
  // updete window state
  const [openUpdeteUser, setOpenUpdeateUser] = useState(false)
  // user ditails from table to state
  const [updateUserDetails, setUpdateUserDetails] = useState({
    _id: "",
    firstName: "",
    email: "",
    role: "",
  })
  // send to backend ruquest whith cookies-"Token" and get response with all users
  const fetchAllUsers = async () => {
    // send to backend ruquest whith cookies-"Token"
    const dataResponse = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    })
    // response with all users get from backend
    const dataApi = await dataResponse.json();
    // check response is success
    if (dataApi.success) {
      // set user data to state
      setAllUsers(dataApi.data)
    }
    // check response is error
    if (dataApi.error) {
      toast.error(dataApi.message, { theme: "colored" })
    }
  }
  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div>
      {/* table */}
      <table className='w-full userTable'>
        {/* table head */}
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* table body whith all users */}
        <tbody>
          {
            allUsers.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.firstName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{moment(user?.createdAt).format("DD-MM-YYYY")}</td>
                  {/* edit button */}
                  <td>
                    <button className='bg-green-100 hover:bg-green-300 p-1 rounded-full hover:text-white'
                      onClick={() => { setOpenUpdeateUser(true); setUpdateUserDetails(user) }}>
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* Up user */}
      {
        openUpdeteUser && (
          <ChangeUserRole
            onClose={() => setOpenUpdeateUser(false)}
            firstName={updateUserDetails.firstName}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userid={updateUserDetails._id}
            callFunc={fetchAllUsers} />
        )
      }
    </div>
  )
}

export default AllUsers