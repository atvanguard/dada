import React from 'react';
import withStyles from 'react-jss';

import ProductBidDrawer from './ProductBidDrawer';
import ProductBtn from './ProductBtn';
import Icon from '../Icon';

import { ReactComponent as Heart} from '../../assets/img/heart.svg';
import { productImage } from './styles';


class ProductImage extends React.Component {

  state = {
    isBidding: false,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isBidding: !prevState.isBidding,
    }));
  }

  render() {
    const { imgSource, alt, classes, title, price, artist } = this.props;
    const { isBidding } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <Icon className={classes.favIcon}>
            <Heart />
          </Icon>
          <img 
            onClick={this.handleClick}
            className={classes.img} 
            src={imgSource} 
            alt={alt}
          />
        </div>
        <ProductBtn 
          title={title}
          price={price}
          artist={artist}
        />
        {!isBidding ? null : (
          <ProductBidDrawer 
            isShowing={isBidding}
            imgSource={imgSource}
            title={title}
            price={price}
            artist={artist}
            alt={alt}
            handleClick={this.handleClick}
          />
        )}
      </div>
    )
  }
}

export default withStyles(productImage)(ProductImage);