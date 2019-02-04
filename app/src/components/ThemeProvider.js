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
    },
    button: {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: '1.15',
      margin: '0',
      overflow: 'hidden',
      textTransform: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      '-webkit-appearance': 'button',
      padding:0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      backgroundColor: 'transparent',
      '-webkit-text-decoration-skip': 'objects'
    },
    'ul, li':{
      margin:0,
      padding:0,
      textDecoration: 'none',
      listStyle: 'none',
    }
  }
}

const CustomThemeProvider = props => <ThemeProvider theme={theme} {...props} />;

export default withStyles(styles)(CustomThemeProvider);