import React from 'react';
import withStyles from 'react-jss';

import NavBarRightItem from './NavBarRightItem';
import NavBarLeftItem from './NavBarLeftItem'
import { navBar } from './styles';

class NavBar extends React.Component {

  static NavBarRight = NavBarRightItem;
  static NavBarLeft = NavBarLeftItem;

  render() {
    const { classes, children } = this.props;
    return(
      <div className={classes.nav} >
        <div className={classes.navContent}>
          { children }
        </div>
      </div>
    )
  }
}

export default withStyles(navBar)(NavBar);