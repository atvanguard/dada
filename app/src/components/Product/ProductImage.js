import React from 'react';
import withStyles from 'react-jss';

import ProductBtn from './ProductBtn'

import { productImage } from './styles';


const ProductImage = props => {
  const { imgSource, alt, classes, title, price, artist } = props;
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={imgSource} alt={alt}/>
      </div>
      <ProductBtn 
        title={title}
        price={price}
        artist={artist}
      />
    </div>
  )
}

export default withStyles(productImage)(ProductImage);