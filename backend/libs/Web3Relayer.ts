import {
  SignedOrder,
  RPCSubprovider
} from '0x.js';
const Web3 = require('web3');
import { contracts } from "../../common/contracts";

import Web3Actions from "../../common/helpers/Web3Actions";
import { BASE_DERIVATION_PATH, MNEMONIC, TX_DEFAULTS, NETWORK_CONFIGS } from '../../common/configs';
import { MnemonicWalletSubprovider } from '@0x/subproviders';

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
    
    // try using the web3Wrapper inherited from super
    this.web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_CONFIGS.rpcUrl));
    // console.log('contracts.ArtToken', contracts.ArtToken)
    this.artContract = new this.web3.eth.Contract(contracts.ArtToken.abi, contracts.ArtToken.address)
  }

  async createNfts(to: string, tokenIds: string[]) {
    const [from] = await this.web3Wrapper.getAvailableAddressesAsync();
    // console.log(to, tokenIds, this.toHex(tokenIds), from)
    const receipt = await this.artContract.methods
        .bulkMint(to, this.toHex(tokenIds))
        .send({from, gasLimit: TX_DEFAULTS.gas});
    console.log('createNfts receipt')
    // validate receipt and throw if invalid
    console.dir(receipt, {depth: null});
  }

  private toHex(tokenIds: string[]) {
    return tokenIds.map(t => '0x' + Buffer.from(t).toString('hex'))
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