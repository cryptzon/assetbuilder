pragma solidity ^0.4.18;

import "./SimpleAssetType.sol";
import "./AssetTypeFactory.sol";

contract SimpleAssetTypeFactory is AssetTypeFactory {

  // Event fired when a new Simple Asset is created
  event SimpleAssetTypeCreated(bytes32 _name, uint _totalSupply, bytes32 _description, address _contractAddress);

  // create a new simple asset type
  function createSimpleAssetType(bytes32 _name, uint _totalSupply, bytes32 _description) public {
    address newContract = new SimpleAssetType(_name, _totalSupply, _description);

    // call parent's function to register asset
    registerAssetType(newContract);

    SimpleAssetTypeCreated(_name, _totalSupply, _description, newContract);
  }

}
