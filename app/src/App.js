import React, { Component } from 'react';
import withStyles from 'react-jss';

import Product from './pages/Product';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Product />
    );
  }
}

const styles = theme => ({
  container: {
    background: theme.colors.bgColor,
    fontSize: '1.5rem',
  }
})

export default withStyles(styles)(App);
