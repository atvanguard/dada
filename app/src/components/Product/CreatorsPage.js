import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'react-bootstrap';

import ProductImage from './ProductImage'
import Container from '../Containers';
import Loader from '../Loader';

import { fetchCreatorArt, importCreatorArt } from '../../store/actions';

import { productList } from './styles';

class CreatorsPage extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    loading: false,
    list: [],
  }

  componentDidMount() {
    this.props.fetchCreatorArt();
  }

  importArt() {
    this.props.importCreatorArt();
  }

  render() {
    const { classes, list } = this.props;
    let artImporter = <Button variant="primary" size="lg" active onClick={this.importArt.bind(this)}>Open my art to bidding</Button>;
    if (this.props.importingArt) {
      artImporter = <Loader />
    } else if (this.props.importArtSuccess) {
      artImporter = <Button variant="secondary" size="lg" disabled>Art Imported</Button>
    }

    return(
      <div>
        <Container className={classes.productList}>
          {!list.length && <Loader />}
          {list.map(item => (
              <ProductImage key={item.id} imgSource={item.url} alt={item.caption} {...item} />
          ))}
        </Container>
        {artImporter}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return ({
    loading: state.products.loading,
    list: state.products.data,
    importingArt: state.importArt.loading,
    importArtSuccess: state.importArt.success
  });
}

export default compose(
  // connect(mapStateToProps, { fetchCreatorArt }),
  connect(mapStateToProps, {fetchCreatorArt, importCreatorArt}),
  withStyle(productList),
) (CreatorsPage);