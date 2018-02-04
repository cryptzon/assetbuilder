pragma solidity ^0.4.18;

contract SimpleAsset {

  string public name;
  uint public totalSupply;
  string public description;

  function SimpleAsset(string _name, uint _totalSupply, string _description) public {
    name = _name;
    totalSupply = _totalSupply;
    description = _description;
  }
}
