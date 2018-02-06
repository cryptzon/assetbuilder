pragma solidity ^0.4.18;

import "./AssetType.sol";

contract AssetTypesRegistry {

  // Event fired when a new Simple Asset is created
  event AssetTypeRegistered(bytes32 _assetType, address _assetTypeAddress, address _assetTypeOwner);

  // mapping with all assets created from a specific owner
  mapping (address => address[]) assetsFromOwners;


  function registerAssetType(address _assetTypeAddress) public {

    AssetType asset = AssetType(_assetTypeAddress);
    bytes32 assetType = asset.assetType();
    address assetTypeOwner = asset.owner();

    assetsFromOwners[assetTypeOwner].push(_assetTypeAddress);

    AssetTypeRegistered(assetType, _assetTypeAddress, assetTypeOwner);
  }

  function getAssetsFromOwner(address _owner) public view returns(address[]){
    return assetsFromOwners[_owner];
  }

}
