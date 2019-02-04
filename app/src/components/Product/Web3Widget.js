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
  }

  async onMetaMaskButtonClick() {
    await this.web3.askForConnection();
    this.buildState()
  }

  async approveToken() {
    await this.web3.setProxyAllowance('ZRX');
    this.buildState()
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
    // const address = await this.getAvailableAddress();

    return(
      <div>
        {isMetaMaskConnected ? (
          <div>
            <PublicAddress address={this.state.ethAddress}/>
            <label>{`Balance: ${this.state.balance}`}</label>
            <label>{`Allowance: ${this.state.allowance}`}</label>
            <Button onClick={this.approveToken}>Approve</Button>
          </div>
        ) : (
          <MetaMaskButton mb={3} onClick={this.onMetaMaskButtonClick}>Connect with MetaMask</MetaMaskButton>
        )}
      </div>
    )
  }
}

export default Web3Widget;