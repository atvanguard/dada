import React from 'react';
import Web3 from '../../web3/Web3Actions'
import withStyle from 'react-jss';

import {
  MetaMaskButton,
  PublicAddress,
  Button
} from 'rimble-ui'

class Web3Widget extends React.Component {

  constructor() {
    super()
    this.state = {}
    this.web3 = new Web3()
    // This binding is necessary to make `this` work in the callback
    this.onMetaMaskButtonClick = this.onMetaMaskButtonClick.bind(this);
    this.approveToken = this.approveToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.placeBid = this.placeBid.bind(this);
  }

  async onMetaMaskButtonClick() {
    await this.web3.askForConnection();
    this.buildState()
  }

  async approveToken() {
    await this.web3.setProxyAllowance('ZRX');
    this.buildState()
  }

  async placeBid() {
    try {
      const sig = await this.web3.createBid(
        '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb', // takerAddress
        '0xabc', // tokenId,
        this.state.value,
        'ZRX'
      )
      console.log('sig', sig)
      // send to /v2/order
    } catch(e) {
      console.log(e)
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async buildState() {
    const ethAddress = await this.web3.getAvailableAddress();
    console.log('address from metamask', ethAddress)

    let balance = await this.web3.getTokenBalance('ZRX');
    balance = balance / 10**18
    
    let allowance = await this.web3.getProxyAllowance('ZRX')
    
    this.setState({isMetaMaskConnected: true, ethAddress, balance, allowance})
  }

  componentDidMount() {}

  render() {
    const isMetaMaskConnected = this.state.isMetaMaskConnected;
    return(
      <div>
        {isMetaMaskConnected ? (
          <div>
            <PublicAddress address={this.state.ethAddress}/>
            <label>{`Balance: ${this.state.balance}`}</label>
            <label>{`Allowance: ${this.state.allowance}`}</label>
            <Button onClick={this.approveToken}>Approve</Button>

            <form class="form-inline">
              <div class="form-group row">
                <label for="bidValue" class="col-sm-2 col-form-label">Bid Amount</label>
                <div class="col-sm-10">
                  <input value={this.state.value} onChange={this.handleChange} type="text" class="form-control" id="bidValue" placeholder="99.76" />
                </div>
              </div>
              <Button onClick={this.placeBid}>Place bid</Button>
            </form>
          </div>
        ) : (
          <MetaMaskButton mb={3} onClick={this.onMetaMaskButtonClick}>Connect with MetaMask</MetaMaskButton>
        )}
      </div>
    )
  }
}

export default Web3Widget;