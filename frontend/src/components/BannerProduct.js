import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2 from '../assest/banner/img2.webp'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3 from '../assest/banner/img3.jpg'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4 from '../assest/banner/img4.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5 from '../assest/banner/img5.webp'
import image5Mobile from '../assest/banner/img5_mobile.png'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    // counter for chenge images
    const [currentImage, setCurrentImage] = useState(0)
    // array of images desktop
    const desktopImages = [image1, image2, image3, image4, image5]
    // array of images mobile
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile]
    // next image
    const nextImage = () => {
        setCurrentImage(currentImage === desktopImages.length - 1 ? 0 : currentImage + 1)
    }
    // preve image
    const preveImage = () => {
        setCurrentImage(currentImage === 0 ? desktopImages.length - 1 : currentImage - 1)
    }
    // timer to avto chenge images
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage()
        }, 3000);
        return () => clearInterval(interval);
    })

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
                {/* buttons */}
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        {/* preve button */}
                        <button className='bg-white shadow-md rounded-full p-1' onClick={preveImage}>
                            <FaAngleLeft />
                        </button>
                        {/* next button */}
                        <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                {/* images slaider desktop */}
                <div className='hidden md:flex w-full h-full overflow-hidden'>
                    {
                        desktopImages.map((image, index) => {
                            return (
                                <div
                                    key={index}
                                    className='h-full w-full min-w-full min-h-full transition-all'
                                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                                >
                                    <img src={image} alt="banner" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
                {/* images slaider mobile */}
                <div className='flex md:hidden w-full h-full overflow-hidden'>
                    {
                        mobileImages.map((image, index) => {
                            return (
                                <div
                                    key={index}
                                    className='h-full w-full min-w-full min-h-full transition-all'
                                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                                >
                                    <img src={image} alt="banner" className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct