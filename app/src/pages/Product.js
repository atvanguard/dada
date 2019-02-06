import React from 'react';

import NavBar from '../components/Navigation';
import ProductList from '../components/Product/ProductList';
import CreatorsPage from '../components/Product/CreatorsPage';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const Product = () => (
  <Router>
    <React.Fragment>
      <NavBar>
        <NavBar.NavBarRight />
        <Link to='/'>Buy Art</Link>
        <Link to='/me'>My Art</Link>
        <NavBar.NavBarLeft />
      </NavBar>
      <Route exact={true} path="/" component={ProductList} />
      <Route path="/me" component={CreatorsPage} />
    </React.Fragment>
  </Router>
);

export default Product;