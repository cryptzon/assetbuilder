var AssetType = artifacts.require("AssetType");

contract("AssetType", async function(accounts) {

  let toAscii = function(str) {
    return web3.toAscii(str).replace(/\u0000/g, '');
  }

  it("should create a new asset type and check asset type value", async function() {
    let assetTypeName = "TestAssetType";
    const contract = await AssetType.new(assetTypeName);

    let assetTypeStored = await contract.assetType.call();

    assert.equal(assetTypeName, toAscii(assetTypeStored), "Asset type not stored correctly");

  });

  it("should create a new asset type and check owner", async function() {
    let assetTypeName = "TestAssetType";
    const contract = await AssetType.new(assetTypeName, {from: accounts[0]});

    assert.equal(await contract.owner.call(), accounts[0], "Owner is not correct");

  });

  it("should create several assets with different owners", async function() {

    let contract = await AssetType.new("Test1", {from: accounts[0]});
    assert.equal(await contract.owner.call(), accounts[0], "Owner0 is not correct");

    contract = await AssetType.new("Test2", {from: accounts[1]});
    assert.equal(await contract.owner.call(), accounts[1], "Owner1 is not correct");

    contract = await AssetType.new("Test3", {from: accounts[2]});
    assert.equal(await contract.owner.call(), accounts[2], "Owner2 is not correct");

    contract = await AssetType.new("Test4", {from: accounts[3]});
    assert.equal(await contract.owner.call(), accounts[3], "Owner3 is not correct");

    contract = await AssetType.new("Test5", {from: accounts[4]});
    assert.equal(await contract.owner.call(), accounts[4], "Owner4 is not correct");
  });

});
