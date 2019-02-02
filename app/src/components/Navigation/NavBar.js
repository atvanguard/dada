import React from 'react';
import withStyles from 'react-jss';

import NavBarRightItem from './NavBarRightItem';
import { navBar } from './styles';

class NavBar extends React.Component {


  render() {
    const { classes, children } = this.props;
    return(
      <div className={classes.nav} >
        { children }
      </div>
    )
  }
}

NavBar.NavBarRight = NavBarRightItem
export default withStyles(navBar)(NavBar);