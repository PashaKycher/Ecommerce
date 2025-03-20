import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <VerticalCardProduct category={'mobile'} heading={"Top's Mobile"}/>
      <HorizontalCardProduct category={'watches'} heading={"Popular's Watches"}/>
      <VerticalCardProduct category={'speakers'} heading={"Top's Speakers"}/>
      <HorizontalCardProduct category={'airpodes'} heading={"Popular's Airpodes"}/>
      <VerticalCardProduct category={'televisions'} heading={"Top's Televisions"}/>
      <HorizontalCardProduct category={'camera'} heading={"Popular's Camera"}/>
      <VerticalCardProduct category={'refrigerator'} heading={"Top's Refrigerator"}/>
      <HorizontalCardProduct category={'mouse'} heading={"Popular's Mouse"}/>
      <VerticalCardProduct category={'trimmers'} heading={"Top's Trimmers"}/>
      <HorizontalCardProduct category={'earphones'} heading={"Popular's Earphones"}/>
    </div>
  )
}

export default Home