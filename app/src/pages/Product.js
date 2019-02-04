import React from 'react';

import NavBar from '../components/Navigation';
import ProductList from '../components/Product/ProductList';

const Product = () => (
  <React.Fragment>
    <NavBar>
      <NavBar.NavBarRight />
      <NavBar.NavBarLeft />
    </NavBar>
    <ProductList />
  </React.Fragment>
);

export default Product;