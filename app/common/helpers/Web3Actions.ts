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

export default class Web3Actions {
  private web3ProviderEngine: Web3ProviderEngine;
  private web3Wrapper: Web3Wrapper;

  constructor(provider: Provider) {
    this.web3ProviderEngine = new Web3ProviderEngine();
    this.web3ProviderEngine.addProvider(provider);
    this.web3ProviderEngine.start();

    this.web3Wrapper = new Web3Wrapper(this.web3ProviderEngine);
  }

  async createBid(
      takerAddress: string,
      tokenId: BigNumber,
      makerTokenAmount: string | number | BigNumber,
      makerTokenAddress: string): Promise<SignedOrder> {
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
}