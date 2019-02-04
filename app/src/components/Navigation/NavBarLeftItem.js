import React from 'react';
import withStyles from 'react-jss';

import Icon from '../Icon';

import { ReactComponent as Hammer} from '../../assets/img/hammer.svg';
import { ReactComponent as Heart} from '../../assets/img/heart.svg'
import { ReactComponent as Search} from '../../assets/img/search.svg';

import { navBarLeft } from './styles';

const NavBarLeftItem = props => {
  const { classes } = props;
  return (
    <div className={classes.navBarLeft}>
      <Icon 
        className={classes.icon}
      >
        <Search />
      </Icon>
      <Icon 
        className={classes.icon}
      >
        <Heart />
      </Icon>
      <Icon 
        className={classes.icon}
      >
        <Hammer />
      </Icon>
    </div>
  )
}

NavBarLeftItem.displayName = "NavBarLeftItem";

export default withStyles(navBarLeft)(NavBarLeftItem);