import React from 'react';
import withStyle from 'react-jss';

import { productBtn } from './styles';

const ProductBtn = props => {
  const { title, artist, price, classes} = props;
  let caption = title;
  if (artist) caption += ` by ${artist}`
  
  return(
    <button className={classes.productBtn}>
        <span className={classes.desc}>{ caption }</span>
        {price &&
          <span className={classes.price}>{price}eth</span>
        }
    </button>
  )
}

export default withStyle(productBtn)(ProductBtn);

