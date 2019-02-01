import React, { Component } from 'react';
import withStyles from 'react-jss';
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        App
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    background: theme.colors.bgColor,
  }
})

export default withStyles(styles)(App);
