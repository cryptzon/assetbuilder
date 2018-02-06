pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract AssetType is Ownable{

  bytes32 public assetType;

  function AssetType(bytes32 _assetType) public {
    assetType = _assetType;
  }

}
