var AssetFactory = artifacts.require("../contacts/AssetFactory.sol");
var SimpleAsset = artifacts.require("./SimpleAsset.sol");

contract("AssetFactory", async function(accounts) {

  const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

  it("should create a new asset type and verify values stored", function() {
    const contract = await AssetFactory.deployed();

    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = SimpleAsset(assetsFromOwner[0]);

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
  });
});
