import React from 'react'
import logo from '../assest/logo.jpg'

const Logo = ({ width, height }) => {
    return (
    <img
        src={logo}
        alt="logo"
        style={{ width: width, height: height }}
        className='mix-blend-multiply cursor-pointer'
    />)
}

export default Logo