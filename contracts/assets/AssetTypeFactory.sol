pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './AssetTypesRegistry.sol';

contract AssetTypeFactory is Ownable{

  address public assetTypesRegistry;

  function setAssetTypesRegistry(address _registry) public onlyOwner() {
    assetTypesRegistry = _registry;
  }

  function registerAssetType(address _assetTypeAddress) internal {
    AssetTypesRegistry registry = AssetTypesRegistry(assetTypesRegistry);

    registry.registerAssetType(_assetTypeAddress);
  }
}
