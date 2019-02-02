export const navBar = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 66,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  }
}

export const drawer = theme => ({
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
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
  }
})