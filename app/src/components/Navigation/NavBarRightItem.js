import React from 'react';
import withStyles from 'react-jss';

import NavDrawer from './NavDrawer';
import Logo from '../Logo'

import { navBarRight } from './styles';

const NavBarRightItem = props => {
  const { classes } = props;
  return (
    <div className={classes.navBarRight}>
      <NavDrawer />
      <Logo />
    </div>
  )
}
NavBarRightItem.displayName = "NavBarRightItem";

export default withStyles(navBarRight)(NavBarRightItem);