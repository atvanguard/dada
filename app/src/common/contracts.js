const ArtToken = require('../ArtToken.json');

const GANACHE_NETWORK_ID = '50';

export const contracts = {
  ArtToken: {
    abi: ArtToken.abi,
    address: ArtToken.networks[GANACHE_NETWORK_ID].address.toLowerCase()
  }
}