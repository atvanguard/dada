import {
  SignedOrder,
  RPCSubprovider
} from '0x.js';
const Web3 = require('web3');

import Web3Actions from "../../common/helpers/Web3Actions";
import { BASE_DERIVATION_PATH, MNEMONIC, TX_DEFAULTS, NETWORK_CONFIGS } from '../../common/configs';
import { MnemonicWalletSubprovider } from '@0x/subproviders';
import { ART_TOKEN_CONTRACT_ADDRESS } from '../../common/constants';

export default class Web3Relayer extends Web3Actions {
  private static instance: Web3Relayer;
  private static artContract;
  private web3;
  private artContract;

  static getInstance() {
    if (!Web3Relayer.instance) {
      Web3Relayer.instance = new Web3Relayer();
    }
    return Web3Relayer.instance;
  }

  constructor() {
    const mnemonicWallet = new MnemonicWalletSubprovider({
      mnemonic: MNEMONIC,
      baseDerivationPath: BASE_DERIVATION_PATH,
    });
    super([mnemonicWallet, new RPCSubprovider(NETWORK_CONFIGS.rpcUrl)]);
    // not sure if RPCSubprovider will work for this one
    // try using the web3Wrapper inherited from super
    this.web3 = new Web3(new RPCSubprovider(NETWORK_CONFIGS.rpcUrl))
    this.artContract = new this.web3.eth.Contract([], ART_TOKEN_CONTRACT_ADDRESS)
  }

  async createNfts(to: string, tokenIds: string[]) {
    const tokenAddress = ART_TOKEN_CONTRACT_ADDRESS.toLowerCase();
    const receipt = await this.artContract.methods.bulkMint(to, tokenIds);
    console.dir('createNfts receipt', receipt);
    // validate receipt and throw if invalid
  }

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