import React from 'react';
import withStyles, { ThemeProvider } from 'react-jss';

import theme from '../theme'

const styles = {
  '@global': {
    ...theme.globals.boxSizing,
    html: {
      fontSize: '62.5%', // 1rem = 10px
      height: '100%',
    },
    body: {
      ...theme.typography.typography,
      background: theme.colors.bgColor,
      margin: 0,
      padding:0,
      height: '100%',
    },
    '#root': {
      height: '100%',
    }
  }
}

const CustomThemeProvider = props => <ThemeProvider theme={theme} {...props} />;

export default withStyles(styles)(CustomThemeProvider);