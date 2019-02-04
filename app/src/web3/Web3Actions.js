import BN from 'bn.js'
import {
    ContractWrappers,
} from '0x.js';
import { SignerSubprovider, RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
// import { contracts } from '../common/contracts';
// import { DECIMALS, NULL_ADDRESS, ZERO } from '../common/constants';
// import { getRandomFutureDateInSeconds } from '../common/utils';

const MAX_256bit = new BN('115792089237316195423570985008687907853269984665640564039457584007913129639935')

class Web3Actions {
  constructor() {
    // https://github.com/0xProject/wiki/blob/master/developer-tools/Web3-Provider-Examples.md
    this.web3ProviderEngine = new Web3ProviderEngine();
    // Compose our Providers, order matters
    // Use the SignerSubprovider to wrap the browser extension wallet
    // All account based and signing requests will go through the SignerSubprovider
    this.web3ProviderEngine.addProvider(new SignerSubprovider(window.web3.currentProvider));
    // Use an RPC provider to route all other requests
    this.web3ProviderEngine.addProvider(new RPCSubprovider('http://localhost:8545'));
    this.web3ProviderEngine.start();

    this.web3Wrapper = new Web3Wrapper(this.web3ProviderEngine);
    this.contractWrappers = new ContractWrappers(this.web3ProviderEngine, { networkId: 50 });
    // this.contractWrappers = new ContractWrappers(this.web3ProviderEngine, { networkId: NETWORK_CONFIGS.networkId });
  }

  askForConnection() {
    return window.ethereum.enable();
  }

  async getAvailableAddress() {
    const accounts = await this.web3Wrapper.getAvailableAddressesAsync();
    return accounts[0];
  }

  async getTokenBalance(tkn) {
    const address = await this.getAvailableAddress()
    return this.contractWrappers.erc20Token.getBalanceAsync(
      this.getTokenAddress(tkn),
      address
    )
  }

  // Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
  async setProxyAllowance(tkn) {
    const address = await this.getAvailableAddress()
    const approvalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      this.getTokenAddress(tkn),
      address,
    );
    return approvalTxHash
  }

  async getProxyAllowance(tkn) {
    const address = await this.getAvailableAddress()
    const allowance = await this.contractWrappers.erc20Token.getProxyAllowanceAsync(
      this.getTokenAddress(tkn),
      address,
    );
    if (allowance.eq(MAX_256bit)) return 'INF'
    return allowance;
  }

  getTokenAddress(tkn) {
    if (tkn === 'ZRX') return getContractAddressesForNetworkOrThrow(50).zrxToken;
    throw new Error('token not supported')
  }

  // // Allow the 0x ERC721 Proxy to move ERC721 tokens on behalf of the creator
  // async setApprovalForArtTokens() {
  //   const [ownerAddress] = await this.web3Wrapper.getAvailableAddressesAsync();
  //   return this.contractWrappers.erc721Token.setProxyApprovalForAllAsync(
  //     contracts.ArtToken.address,
  //     ownerAddress,
  //     true // isApproved
  //   );
  // }

  // async createBid(takerAddress, tokenId, makerTokenAmount, makerTokenAddress) {
  //   // intention is to get the address from metamask
  //   const [makerAddress] = await this.web3Wrapper.getAvailableAddressesAsync();
  //   // the amount the maker is selling of maker asset
  //   const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(makerTokenAmount), DECIMALS);
  //   // the amount the maker wants of taker asset
  //   const takerAssetAmount = new BigNumber(1);

  //   // 0x v2 uses hex encoded asset data strings to encode all the information needed to identify an asset
  //   const makerAssetData = assetDataUtils.encodeERC20AssetData(makerTokenAddress);
  //   const takerAssetData = assetDataUtils.encodeERC721AssetData(contracts.ArtToken.address, tokenId);

  //   // Create the order
  //   const order = {
  //     exchangeAddress: contracts.Exchange.address,
  //     makerAddress,
  //     takerAddress,
  //     senderAddress: NULL_ADDRESS,
  //     feeRecipientAddress: NULL_ADDRESS,
  //     expirationTimeSeconds: getRandomFutureDateInSeconds(),
  //     salt: generatePseudoRandomSalt(),
  //     makerAssetAmount,
  //     takerAssetAmount,
  //     makerAssetData,
  //     takerAssetData,
  //     makerFee: ZERO,
  //     takerFee: ZERO,
  //   };

  //   // Generate the order hash and sign it
  //   const orderHashHex = orderHashUtils.getOrderHashHex(order);
  //   const signature = await signatureUtils.ecSignHashAsync(this.web3ProviderEngine, orderHashHex, makerAddress);
  //   const signedOrder = { ...order, signature };
  //   return signedOrder;
  // }

  // // intended to make it work like meta-tx
  // async fulfillBid(signedOrder, taker, takerAssetAmount) {
  //   // The transaction encoder provides helpers in encoding 0x Exchange transactions to allow
  //   // a third party to submit the transaction. This operates in the context of the signer (taker)
  //   // rather then the context of the submitter (sender)
  //   const transactionEncoder = await this.contractWrappers.exchange.transactionEncoderAsync();
  //   // This is an ABI encoded function call that the taker wishes to perform
  //   // in this scenario it is a fillOrder
  //   const fillData = transactionEncoder.fillOrderTx(signedOrder, takerAssetAmount);
  //   // Generate a random salt to mitigate replay attacks
  //   const takerTransactionSalt = generatePseudoRandomSalt();
  //   // The taker signs the operation data (fillOrder) with the salt
  //   const executeTransactionHex = transactionEncoder.getTransactionHex(fillData, takerTransactionSalt, taker);
  //   const takerSignatureHex = await signatureUtils.ecSignHashAsync(this.web3ProviderEngine, executeTransactionHex, taker);
  //   return takerSignatureHex;
  // }
}

export default Web3Actions;
