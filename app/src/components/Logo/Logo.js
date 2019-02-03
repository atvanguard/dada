import React from 'react';
import withStyles from 'react-jss';

import Icon from '../Icon';

import hand from '../../assets/img/hand.svg'
import styles from './styles';

const Logo = props => {
  const { classes } = props;

  return (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <Icon 
          iconSource={hand}
          alt="Logo icon"
          className={classes.icon}
        />
        <span>Dada</span>
      </a>
    </div>
  )
}


export default withStyles(styles)(Logo);