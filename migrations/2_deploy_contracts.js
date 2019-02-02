var ArtToken = artifacts.require("ArtToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ArtToken);
};
