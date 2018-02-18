pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './FungibleAssetStore.sol';

contract FungibleAssetStoreFactory {

  address[] private stores;

  event Debug(string _str);

  event StoreCreated(string _name, string _url, address _address);

  function createStore(string _name, string _url) public {
    FungibleAssetStore store = new FungibleAssetStore(_name, _url);
    //store.setOwnership(msg.sender);
    address storeAddress = address(store);
    stores.push(storeAddress);
    StoreCreated(_name, _url, address(storeAddress));
  }

  function getNumberStores() public view returns (uint) {
    return stores.length;
  }

  function getStoreAddress(uint _index) public returns (address) {
    require(_index < stores.length);
    return stores[_index];
  }
}
