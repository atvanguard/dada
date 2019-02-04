export const productList = {
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  '@media (min-width: 1024px)': {
    productList: {
      justifyContent: 'center',
    }
  }
}
export const productImage = theme => ({
  container: {
    width: '14rem',
    height: '26rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:not(last-child)': {
      marginBottom: '2.5rem',
    },
  },
  imgContainer: {
    height: '20rem',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '2.3rem',
    border: '2px solid rgba(51, 51, 51, 0.8)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    position: 'relative',
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  favIcon: {
    position: 'absolute',
    top: '0.2rem',
    right: '0.2rem',
    background: theme.colors.primaryColor,
    borderRadius: '50%',
    '& svg': {
      fill: '#fff',
      width: 22,
      height: 22,
      display:'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  },
  '@media (min-width: 1024px)': {
    container: {
      width: '25rem',
      height: '37rem',
      '&:not(last-child)': {
        marginRight: '2.5rem',
      },
    },
    imgContainer: {
      height: '30rem',
    }
  },
})

export const productBtn = {
  productBtn: {
    height: '5rem',
    border: '2px solid #000',
    fontSize: '1.2rem',
    display: 'flex',
    maxWidth: '25rem',
  },
  desc: {
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'60%',
    height: 'inherit',
    padding: '0.1rem 0.2rem',
  },
  price: {
    background: '#333',
    color: '#fff',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    flex:1,
  }
}

export const productBidDrawer = {
  drawerContainer: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerCard: {
    background: '#fff',
    width: '80%',
    padding: '1.5rem 2.5rem',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  drawerCardHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  drawerCardImg: {
    height: '70%'
  },
  drawerImg: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  '@media (min-width: 1024px)': {
    drawerCard: {
      width: '50%',
    },
    productImage: {
      width: '25rem'
    }
  }
}