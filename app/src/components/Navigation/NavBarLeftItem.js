import React from 'react';
import withStyles from 'react-jss';

import Icon from '../Icon';

import hammer from '../../assets/img/hammer.svg';
import heart from '../../assets/img/heart.svg';
import search from '../../assets/img/search.svg';

import { navBarLeft } from './styles';

const NavBarLeftItem = props => {
  const { classes } = props;
  return (
    <div className={classes.navBarLeft}>
      <Icon 
        iconSource={search}
        alt="search icon"
        className={classes.icon}
      />
      <Icon 
        iconSource={heart}
        alt="heart icon"
        className={classes.icon}
      />
      <Icon 
        iconSource={hammer}
        alt="hammer icon"
        className={classes.icon}
      />
    </div>
  )
}
NavBarLeftItem.displayName = "NavBarLeftItem";

export default withStyles(navBarLeft)(NavBarLeftItem);