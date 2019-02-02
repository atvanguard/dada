export const navBar = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 66,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  navContent: {
    maxWidth: '96rem',
    display: 'flex',
    margin: 'auto',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

export const drawer = theme => ({
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    background: theme.colors.secondaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    transition: 'all 300ms',
  },
  menu: {
    marginRight: '1.2rem',
  }
})

export const navBarRight = {
  navBarRight: {
    display: 'flex',
    alignItems: 'center',
  }
}

export const navBarLeft = {
  navBarLeft: {

  },
  icon: {
    '&:not(:last-child)': {
      marginRight: '1rem',
    }
  }
}