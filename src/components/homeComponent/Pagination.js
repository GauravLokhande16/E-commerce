import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { listProduct } from '../../Redux/Actions/ProductActions'

const Pagination = (props) => {
  const { page, pages, keyword="" } = props
  

  return (
    pages > 1 && (
      <nav>
        <ul className='pagination justify-content-center'>
          {[...Array(pages).keys()].map((x)=>(
            <li className={`page-item ${x+1 === page ? "active" : ""}`} key={x + 1}>
              <Link className='page-link' to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`}>
              {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  )
}

export default Pagination