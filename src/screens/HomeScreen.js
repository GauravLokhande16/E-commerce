import React from 'react'
import Header from '../components/Header'
import ShopSection from '../components/homeComponent/ShopSection'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword
  const pagenumber = params.pagenumber 



  return (
    <div className='container'>
      <Header  />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <Footer />
    </div>
  )
}

export default HomeScreen