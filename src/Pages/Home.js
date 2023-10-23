import React from 'react'
import NavBar_ from '../features/NavBar/NavBar_'
import { ProductList } from '../features/Product List/Component/ProductList'

const Home = () => {
  return (
    <>
        <NavBar_>
            <ProductList/>
        </NavBar_>
    </>
  )
}

export default Home