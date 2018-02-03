pragma solidity ^0.4.18;

import "./SimpleAsset.sol";

contract AssetFactory {

  function hello() public pure returns(string) {
    return "Hello World!";
  }

  address[] assetContracts;

  function registerSimpleAssetType(string _name, uint _totalSupply, string _description) public returns(address){
    address newContract = new SimpleAsset(_name, _totalSupply, _description);
    assetContracts.push(newContract);
  }
  
}
