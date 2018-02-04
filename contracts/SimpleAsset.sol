pragma solidity ^0.4.18;

contract SimpleAsset {

  bytes32 public name;
  uint public totalSupply;
  bytes32 public description;

  function SimpleAsset(bytes32 _name, uint _totalSupply, bytes32 _description) public {
    name = _name;
    totalSupply = _totalSupply;
    description = _description;
  }
}
