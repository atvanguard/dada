import React from 'react';
import { Transition, config, animated } from 'react-spring';
import withStyles from 'react-jss';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Drawer from '../Drawer';
import ProductBtn from './ProductBtn';
import Web3Widget from "./Web3Widget";

import {productBidDrawer} from './styles';
import Icon from '../Icon';

import { ReactComponent as Close } from '../../assets/img/close.svg';
import { ReactComponent as Heart } from '../../assets/img/heart.svg';

class ProductBidDrawer extends React.Component {
  
  targetElement = null;

  componentDidMount() {
    document.getElementById('root').style.filter = 'blur(5px)';
    this.targetElement = document.getElementById('nav-root');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    document.getElementById('root').style.filter = 'none';
    enableBodyScroll(this.targetElement)
  }
  
  render() {
    const { isShowing,
            handleClick,
            classes,
            imgSource,
            title,
            price,
            artist,
            alt } = this.props;
    
    return(
      <Transition
        native
        items={isShowing}
        from={{opacity: 0}}
        enter={{opacity: 1}}
        leave={{opacity: 0}}
        config={{...config.default}}
      >
      {isShowing => isShowing && ( props => (
        <Drawer>
          <animated.div className={classes.drawerContainer} style={props}>
            <div className={classes.drawerCard}>
              <div className={classes.drawerCardHeader}>
                <Icon clickHandler={handleClick}>
                  <Close />
                </Icon>
                <Icon>
                  <Heart />
                </Icon>
              </div>
              <div className={classes.drawerCardImg}>
                <img className={classes.drawerImg} src={imgSource} alt={alt}/>
              </div>
              <ProductBtn
                title={title}
                price={price}
                artist={artist}
              />
              <Web3Widget />
            </div>
          </animated.div>
        </Drawer>
      ))}
      </Transition>
    )
  }
}

export default withStyles(productBidDrawer)(ProductBidDrawer);