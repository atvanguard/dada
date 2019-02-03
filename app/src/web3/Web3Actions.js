import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    orderHashUtils,
    signatureUtils,
    Web3ProviderEngine
} from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { contracts } from './common/contracts';
import { DECIMALS, NULL_ADDRESS, ZERO } from './common/constants';
import { getRandomFutureDateInSeconds } from './common/utils';

class Web3Actions {
  // public web3ProviderEngine;
  // public web3Wrapper: Web3Wrapper;
  // public contractWrappers: ContractWrappers;

  constructor(providers) {
    // https://github.com/0xProject/wiki/blob/master/developer-tools/Web3-Provider-Examples.md
    this.web3ProviderEngine = new Web3ProviderEngine();
    providers.forEach(p => {
      this.web3ProviderEngine.addProvider(p);  
    })
    this.web3ProviderEngine.start();

    this.web3Wrapper = new Web3Wrapper(this.web3ProviderEngine);
    // check how this'll work in the UI
    this.contractWrappers = new ContractWrappers(this.web3ProviderEngine, { networkId: 50 });
    // this.contractWrappers = new ContractWrappers(this.web3ProviderEngine, { networkId: NETWORK_CONFIGS.networkId });
  }

  async approve(erc20TokenAddress) {
    const [ownerAddress] = await this.web3Wrapper.getAvailableAddressesAsync();
    // if required, use setUnlimitedAllowanceAsync
    return this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(erc20TokenAddress, ownerAddress)
  }

  async createBid(takerAddress, tokenId, makerTokenAmount, makerTokenAddress) {
    // intention is to get the address from metamask
    const [makerAddress] = await this.web3Wrapper.getAvailableAddressesAsync();
    // the amount the maker is selling of maker asset
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(makerTokenAmount), DECIMALS);
    // the amount the maker wants of taker asset
    const takerAssetAmount = new BigNumber(1);

    // 0x v2 uses hex encoded asset data strings to encode all the information needed to identify an asset
    const makerAssetData = assetDataUtils.encodeERC20AssetData(makerTokenAddress);
    const takerAssetData = assetDataUtils.encodeERC721AssetData(contracts.ArtToken.address, tokenId);

    // Create the order
    const order = {
      exchangeAddress: contracts.Exchange.address,
      makerAddress,
      takerAddress,
      senderAddress: NULL_ADDRESS,
      feeRecipientAddress: NULL_ADDRESS,
      expirationTimeSeconds: getRandomFutureDateInSeconds(),
      salt: generatePseudoRandomSalt(),
      makerAssetAmount,
      takerAssetAmount,
      makerAssetData,
      takerAssetData,
      makerFee: ZERO,
      takerFee: ZERO,
    };

    // Generate the order hash and sign it
    const orderHashHex = orderHashUtils.getOrderHashHex(order);
    const signature = await signatureUtils.ecSignHashAsync(this.web3ProviderEngine, orderHashHex, makerAddress);
    const signedOrder = { ...order, signature };
    return signedOrder;
  }

  // intended to make it work like meta-tx
  async fulfillBid(signedOrder, taker, takerAssetAmount) {
    // The transaction encoder provides helpers in encoding 0x Exchange transactions to allow
    // a third party to submit the transaction. This operates in the context of the signer (taker)
    // rather then the context of the submitter (sender)
    const transactionEncoder = await this.contractWrappers.exchange.transactionEncoderAsync();
    // This is an ABI encoded function call that the taker wishes to perform
    // in this scenario it is a fillOrder
    const fillData = transactionEncoder.fillOrderTx(signedOrder, takerAssetAmount);
    // Generate a random salt to mitigate replay attacks
    const takerTransactionSalt = generatePseudoRandomSalt();
    // The taker signs the operation data (fillOrder) with the salt
    const executeTransactionHex = transactionEncoder.getTransactionHex(fillData, takerTransactionSalt, taker);
    const takerSignatureHex = await signatureUtils.ecSignHashAsync(this.web3ProviderEngine, executeTransactionHex, taker);
    return takerSignatureHex;
  }
}

export default Web3Actions;
