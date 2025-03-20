import React from 'react'

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div onClick={onClose}
            className='fixed top-0 left-0 bottom-0 right-0 bg-slate-600 
                    bg-opacity-50 flex justify-center items-center'>
            <div className='flex justify-center items-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} alt="big product" className='w-full h-full' />
            </div>
        </div>
    )
}

export default DisplayImage