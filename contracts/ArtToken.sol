pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract ArtToken is ERC721 {
  /**
   * @dev Mint several tokens for a single owner
   * Reverts if the given token ID already exists
   * @param to The address that will own the minted token
   * @param tokenIds uint256 IDs of the tokens to be minted
   */
  function bulkMint(address to, uint256[] calldata tokenIds) external {
    require(to != address(0));

    for(uint8 i = 0; i < tokenIds.length; i++) {
      _mint(to, tokenIds[i]);
    }
  }
}
