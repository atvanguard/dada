import React from 'react';
import withStyles from 'react-jss';

import Icon from '../Icon';

import { ReactComponent as Hand } from '../../assets/img/hand.svg'
import styles from './styles';

const Logo = props => {
  const { classes } = props;

  return (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <Icon 
          className={classes.icon}
        >
          <Hand />
        </Icon>
        <span>Dada</span>
      </a>
    </div>
  )
}


export default withStyles(styles)(Logo);