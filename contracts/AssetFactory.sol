pragma solidity ^0.4.18;

import "./SimpleAsset.sol";

contract AssetFactory {

  function hello() public pure returns(string) {
    return "Hello World!";
  }

  // Event fired when a new Simple Asset is created
  event SimpleAssetCreated(string _name, uint _totalSupply, string _description, address _contractAddress);

  // mapping with all assets created from a specific owner
  mapping (address => address[]) assetsFromOwners;


  function registerSimpleAssetType(string _name, uint _totalSupply, string _description) public returns(address){
    address newContract = new SimpleAsset(_name, _totalSupply, _description);
    assetsFromOwners[msg.sender].push(newContract);
    SimpleAssetCreated(_name, _totalSupply, _description, newContract);
    return newContract;
  }

  function getAssetsFromOwner(address _owner) public view returns(address[]){
    return assetsFromOwners[_owner];
  }




}
