pragma solidity ^0.4.18;

import "./SimpleAssetType.sol";
import "./AssetTypeFactory.sol";

contract SimpleAssetTypeFactory is AssetTypeFactory {

  // Event fired when a new Simple Asset is created
  event SimpleAssetTypeCreated(bytes32 _name, uint _totalSupply, bytes32 _description, address _contractAddress);

  // create a new simple asset type
  function createSimpleAssetType(bytes32 _name, uint _totalSupply, bytes32 _description) public {

    SimpleAssetType assetType = new SimpleAssetType(_name, _totalSupply, _description);

    // One needs to move the ownership of the asset to the msg.sender, otherwise the owner would be this contract
    assetType.transferOwnership(msg.sender);

    address assetAddress = address(assetType);

    // call parent's function to register asset
    registerAssetType(assetAddress);

    SimpleAssetTypeCreated(_name, _totalSupply, _description, assetAddress);
  }

  function test() public {
    //address newContract = new SimpleAssetType("abc", 10, "_description");
    //registerAssetType(newContract);
  }

}
