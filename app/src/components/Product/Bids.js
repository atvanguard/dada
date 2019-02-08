import bn from 'bn.js';
import React from 'react';
import Web3 from '../../web3/Web3Actions'
import { connect } from 'react-redux'
import { fetchbids } from '../../store/actions';
import {BigNumber} from '0x.js'
import { Button, ListGroup } from 'react-bootstrap';
import Container from '../Containers';

class Bids extends React.Component {

  constructor() {
    super()
    this.state = {}
    this.web3 = new Web3()
    // this.onMetaMaskButtonClick = this.onMetaMaskButtonClick.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchbids()
  }

  async fullfilBid(i) {
    try {
      console.log(i)
      const sig = await this.web3.fulfillBid(this.props.bids.data[i], new BigNumber(1))
      console.log('sig', sig)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const items = [];
    const bids = this.props.bids;
    ((bids && bids.data) || []).forEach((bid, i) => {
      // console.log(bid,i)
      items.push(
        <ListGroup.Item key={i}>
          <span>makerAssetAmount = {bid.makerAssetAmount / 10**18}</span><br/>
          <span>expiration = {bid.expirationTimeSeconds}</span><br/>
          <Button onClick={() => this.fullfilBid(i)}>Fullfil Bid</Button>
        </ListGroup.Item>)
    })
    return(
      <Container>
        {items}
      </Container>
      
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return ({
    bids: state.bids
  });
}

export default connect(mapStateToProps, {fetchbids})(Bids)
// export default compose(
//   withStyle(productList),
// ) (Bids);
