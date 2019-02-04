import React from 'react';

import NavBar from '../components/Navigation';
import ProductList from '../components/Product/ProductList';
import Web3Widget from '../components/Product/Web3Widget';

const Product = () => (
  <React.Fragment>
    <NavBar>
      <NavBar.NavBarRight />
      <NavBar.NavBarLeft />
    </NavBar>
    <ProductList />
    <Web3Widget />
  </React.Fragment>
);

export default Product;