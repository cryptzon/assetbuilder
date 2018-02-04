pragma solidity ^0.4.18;

import "./SimpleAsset.sol";

contract AssetFactory {

  function hello() public pure returns(string) {
    return "Hello World!";
  }

  // Event fired when a new Simple Asset is created
  event SimpleAssetCreated(bytes32 _name, uint _totalSupply, bytes32 _description, address _contractAddress);

  address[] assetContracts;

  // mapping with all assets created from a specific owner
  mapping (address => address[]) assetsFromOwners;


  function registerSimpleAssetType(bytes32 _name, uint _totalSupply, bytes32 _description) public returns(address){
    address newContract = new SimpleAsset(_name, _totalSupply, _description);
    assetContracts.push(newContract);
    SimpleAssetCreated(_name, _totalSupply, _description, newContract);
    return newContract;
  }

  function getAssetsFromOwner(address _owner) public view returns(address[]){
    return assetsFromOwners[_owner];
  }




}
