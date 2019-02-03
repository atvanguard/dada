const ArtToken = require('../../build/contracts/ArtToken.json');
const Exchange = require('../../build/contracts/Exchange.json');

const GANACHE_NETWORK_ID = '50';

export const contracts = {
  ArtToken: {
    abi: ArtToken.abi,
    address: ArtToken.networks[GANACHE_NETWORK_ID].address.toLowerCase()
  },
  Exchange: {
    abi: Exchange.abi,
    address: Exchange.networks[GANACHE_NETWORK_ID].address.toLowerCase()
  },
}