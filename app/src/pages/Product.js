import React from 'react';

import NavBar from '../components/Navigation';
import ProductList from '../components/Product/ProductList';
import CreatorsProductList from '../components/Product/CreatorsProductList';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const Product = () => (
  <Router>
    <React.Fragment>
      <NavBar>
        <NavBar.NavBarRight />
        <a href="/">Buy Art</a>
        <Link to={`/me`}>My Art</Link>
        {/* <a href="/me">My Art</a> */}
        <NavBar.NavBarLeft />
      </NavBar>
      <Route exact={true} path="/" component={ProductList} />
      <Route path="/me" component={CreatorsProductList} />
    </React.Fragment>
  </Router>
);

export default Product;