import React from 'react';
import Web3 from '../../web3/Web3Actions'
import withStyle from 'react-jss';

import { MetaMaskButton } from 'rimble-ui'

class Web3Widget extends React.Component {

  constructor() {
    super()
    this.web3 = new Web3()
    // This binding is necessary to make `this` work in the callback
    this.onMetaMaskButtonClick = this.onMetaMaskButtonClick.bind(this);
  }

  async onMetaMaskButtonClick() {
    await this.web3.askForConnection();
  }

  componentDidMount() {}

  render() {
    return(
      <MetaMaskButton mb={3} onClick={this.onMetaMaskButtonClick}>Connect with MetaMask</MetaMaskButton>
    )
  }
}

export default Web3Widget;