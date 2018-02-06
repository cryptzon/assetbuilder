pragma solidity ^0.4.18;

import "./AssetType.sol";

contract SimpleAssetType is AssetType {

  bytes32 public name;
  uint public totalSupply;
  bytes32 public description;

  function SimpleAssetType(bytes32 _name, uint _totalSupply, bytes32 _description) public AssetType("SimpleAssetType")  {
    name = _name;
    totalSupply = _totalSupply;
    description = _description;
  }
}
