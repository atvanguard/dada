import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ProductImage from './ProductImage'
import Container from '../Containers';
import Loader from '../Loader';

import { fetchCreatorArt } from '../../store/actions';

import { productList } from './styles';

class CreatorsProductList extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    loading: false,
    list: [],
  }

  componentDidMount() {
    const { fetchCreatorArt } = this.props;
    fetchCreatorArt();
  }

  render() {
    const { classes, list } = this.props;
    console.log('list', list)
    return(
      <Container className={classes.productList}>
        {!list.length && <Loader />}
        {list.map(item => (
            <ProductImage key={item.id} imgSource={item.url} alt={item.caption} {...item} />
        ))}
      </Container>
    )
  }
}
function mapStateToProps(state) {
  return ({
    loading: state.products.loading,
    list: state.products.data,
  });
}

export default compose(
  connect(mapStateToProps, { fetchCreatorArt }),
  withStyle(productList),
) (CreatorsProductList);