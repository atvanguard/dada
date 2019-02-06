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
    const { imgSource, alt, classes, caption, price, owner } = this.props;
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
          title={caption}
          price={price}
          artist={owner}
        />
        {!isBidding ? null : (
          <ProductBidDrawer 
            isShowing={isBidding}
            imgSource={imgSource}
            title={caption}
            price={price}
            artist={owner}
            alt={alt}
            handleClick={this.handleClick}
          />
        )}
      </div>
    )
  }
}

export default withStyles(productImage)(ProductImage);