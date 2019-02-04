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
export const productImage = {
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
  '@media (min-width: 1024px)': {
    container: {
      '&:not(last-child)': {
        marginRight: '2.5rem',
      },
    }
  },
  imgContainer: {
    height: '20rem',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '2.3rem',
    border: '2px solid rgba(51, 51, 51, 0.8)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }
}

export const productBtn = {
  productBtn: {
    height: '5rem',
    border: '2px solid #000',
    fontSize: '1.2rem',
    display: 'flex',
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