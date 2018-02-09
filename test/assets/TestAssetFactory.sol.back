pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
//import "../contracts/MetaCoin.sol";

import "../contracts/SimpleAsset.sol";
import "../contracts/AssetFactory.sol";


contract TestAssetFactory {

  function testNewAssetType() public {
    AssetFactory factory = AssetFactory(DeployedAddresses.AssetFactory());
    bytes32 name = "Test1";
    uint totalSupply = 1000;
    bytes32 description = "This is a test";

    address assetTypeAddress = factory.registerSimpleAssetType(name, totalSupply, description);

    SimpleAsset asset = SimpleAsset(assetTypeAddress);
    Assert.equal(asset.name(), name, "Name should have been Test1");
    Assert.equal(asset.totalSupply(), totalSupply, "Total Supply should have been 1000");
    Assert.equal(asset.description(), description, "Description is not equal");
  }

  function testSeveralAssetType() public {
    AssetFactory factory = AssetFactory(DeployedAddresses.AssetFactory());

    bytes32 name = "Test1";
    uint totalSupply = 1000;
    bytes32 description = "This is a test";

    address assetTypeAddress = factory.registerSimpleAssetType(name, totalSupply, description);

    SimpleAsset asset1 = SimpleAsset(assetTypeAddress);
    Assert.equal(asset1.name(), name, "Name not correct");
    Assert.equal(asset1.totalSupply(), totalSupply, "Total Supply not correct");
    Assert.equal(asset1.description(), description, "Description not correct");

    name = "Test2";
    totalSupply = 1000000;
    description = "This is a test2";

    address assetType2Address = factory.registerSimpleAssetType(name, totalSupply, description);

    SimpleAsset asset2 = SimpleAsset(assetType2Address);
    Assert.equal(asset2.name(), name, "Name not correct");
    Assert.equal(asset2.totalSupply(), totalSupply, "Total Supply not correct");
    Assert.equal(asset2.description(), description, "Description not correct");
  }

  /*function testAssetTypeFromOwner() public {
    AssetFactory factory = AssetFactory(DeployedAddresses.AssetFactory());

    bytes32 name = "Test1";
    uint totalSupply = 1000;
    bytes32 description = "This is a test";

    address assetType1Address = factory.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    address[] storage assetsFromOwner = factory.getAssetsFromOwner(accounts[0]);
    Assert.equal(assetsFromOwner.length, 1, "Array of addresses is not 1");
    Assert.equal(assetType1Address, assetsFromOwner[0], "Addresses are not equal");


  }*/



/*
  function testInitialBalanceUsingDeployedContract() public {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
*/
}
