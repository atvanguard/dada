import React from 'react';
import withStyle from 'react-jss';

// import ProductBtn from './ProductBtn';
import ProductImage from './ProductImage'
import Container from '../Containers';
import list from './mockData';

import { productList } from './styles';

class ProductList extends React.Component {

  state = {
    list: []
  }
  componentDidMount() {
    this.setState({
      list,
    })
  }

  render() {
    const { list } = this.state;
    const { classes } = this.props;
    return(
      <Container className={classes.productList}>
        {list.map(item => (
            <ProductImage key={item.id} imgSource={item.img} alt={item.title} {...item} />
        ))}
      </Container>
    )
  }
}

export default withStyle(productList)(ProductList);