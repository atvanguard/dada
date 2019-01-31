import {
  SignedOrder
} from '0x.js';

import Web3Actions from "../common/helpers/Web3Actions";
import { NETWORK_CONFIGS, TX_DEFAULTS } from '../common/configs';

export default class Web3Relayer extends Web3Actions {
  async matchOrders(leftSignedOrder: SignedOrder, rightSignedOrder: SignedOrder, matcherAccount: string) {
    if (!matcherAccount) {
      [matcherAccount] = await this.web3Wrapper.getAvailableAddressesAsync();
    }
    const txHash = await this.contractWrappers.exchange.matchOrdersAsync(leftSignedOrder, rightSignedOrder, matcherAccount, {
      gasLimit: TX_DEFAULTS.gas,
  });
  }

  async sendSignedTransaction() {
    // web3.sendSignedTransaction
  }
}