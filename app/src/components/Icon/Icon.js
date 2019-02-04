import React from 'react';
import withStyles from 'react-jss';

import styles from './styles';

const Icon = props => {
  const { clickHandler, classes, className, children } = props;

  return (
    <span
      className={`${classes.icon} ${className ? className: ''}`}
      onClick={clickHandler}>
        { children }
    </span>
  )
}

export default withStyles(styles)(Icon);