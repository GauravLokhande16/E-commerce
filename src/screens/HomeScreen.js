import React from 'react'
import Header from '../components/Header'
import ShopSection from '../components/homeComponent/ShopSection'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword
  const pagenumber = params.pagenumber 



  return (
    <div className='container-fluid'>
      <Header  />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
    </div>
  )
}

export default HomeScreen