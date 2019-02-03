import React from 'react';
import withStyle from 'react-jss';

import styles from './styles';

const Container = (props) => {

  const { className, classes } = props;

  return (
  <div className={`${classes.container} ${className ? className: ''}`}>
    {props.children}
  </div>
);
}

export default withStyle(styles)(Container);