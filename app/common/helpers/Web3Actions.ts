import {
  assetDataUtils,
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  SignedOrder,
  orderHashUtils,
  signatureUtils,
  Web3ProviderEngine
} from '0x.js';
import { Provider, Web3Wrapper } from '@0x/web3-wrapper';

import { DECIMALS, NULL_ADDRESS, ZERO } from '../constants';
import { contractAddresses, dummyERC721TokenContracts } from '../contracts';
import { getRandomFutureDateInSeconds } from '../utils';
import { NETWORK_CONFIGS, TX_DEFAULTS } from '../configs';

export default class Web3Actions {
  public web3ProviderEngine: Web3ProviderEngine;
  public web3Wrapper: Web3Wrapper;
  public contractWrappers: ContractWrappers;

  constructor(provider: Provider) {
    this.web3ProviderEngine = new Web3ProviderEngine();
    this.web3ProviderEngine.addProvider(provider);
    this.web3ProviderEngine.start();

    this.web3Wrapper = new Web3Wrapper(this.web3ProviderEngine);
    this.contractWrappers = new ContractWrappers(this.web3ProviderEngine, { networkId: NETWORK_CONFIGS.networkId });
  }

  async createBid(
      takerAddress: string,
      tokenId: BigNumber,
      makerTokenAmount: string | number | BigNumber,
      makerTokenAddress: string): Promise<SignedOrder> {
    // intention is to get the address from metamask
    const [makerAddress] = await this.web3Wrapper.getAvailableAddressesAsync();
    // the amount the maker is selling of maker asset
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(makerTokenAmount), DECIMALS);
    // the amount the maker wants of taker asset
    const takerAssetAmount = new BigNumber(1);

    // 0x v2 uses hex encoded asset data strings to encode all the information needed to identify an asset
    const makerAssetData = assetDataUtils.encodeERC20AssetData(makerTokenAddress);
    // replace the dummy with const artGalleryContract contract address
    const artGalleryContract = dummyERC721TokenContracts[0];
    const takerAssetData = assetDataUtils.encodeERC721AssetData(artGalleryContract.address, tokenId);

    // Create the order
    const order: Order = {
      exchangeAddress: contractAddresses.exchange,
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

  // see execute_transactions.ts in 0x-starter-project scenarios
  async fulfillBid(signedOrder: SignedOrder, taker: string, takerAssetAmount: BigNumber): Promise<string> {
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