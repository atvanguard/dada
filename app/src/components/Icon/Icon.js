import React from 'react';
import withStyles from 'react-jss';

import styles from './styles';

const Icon = props => {
  const { iconSource, clickHandler, classes, alt, className } = props;

  return (
    <span
      className={`${classes.icon} ${className ? className: ''}`}
      onClick={clickHandler}>
      <img 
        className={classes.img}
        src={iconSource} alt={alt}
      />
    </span>
  )
}

export default withStyles(styles)(Icon);