var AssetFactory = artifacts.require("AssetFactory");
var SimpleAsset = artifacts.require("SimpleAsset");

contract("AssetFactory", async function(accounts) {
  /*
  const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );*/

  it("should create a new asset type and verify values stored", async function() {
    const contract = await AssetFactory.new();

    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAsset.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");
  });

  it("should create 3 new asset type from same owner and verify values stored", async function() {
    const contract = await AssetFactory.new();

    // asset #1
    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAsset.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");

    // asset #2
    name = "Test2";
    totalSupply = 10;
    description = "This is a test 2!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 2, "Assets from owner not 2");

    simpleAssetContract = await SimpleAsset.at(assetsFromOwner[1]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");

    // asset #3
    name = "Test3";
    totalSupply = 50;
    description = "This is a test 3!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 3, "Assets from owner not 3");

    simpleAssetContract = await SimpleAsset.at(assetsFromOwner[2]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");

  });

  it("should create 3 new asset type from different owners and verify values stored", async function() {
    const contract = await AssetFactory.new();

    // asset #1
    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await contract.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAsset.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");

    // asset #2
    name = "Test2";
    totalSupply = 10;
    description = "This is a test 2!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[1]});

    assetsFromOwner = await contract.getAssetsFromOwner(accounts[1]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    simpleAssetContract = await SimpleAsset.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");

    // asset #3
    name = "Test3";
    totalSupply = 50;
    description = "This is a test 3!";

    await contract.registerSimpleAssetType(name, totalSupply, description, {from: accounts[2]});

    assetsFromOwner = await contract.getAssetsFromOwner(accounts[2]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    simpleAssetContract = await SimpleAsset.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, await simpleAssetContract.name.call(), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, await simpleAssetContract.description.call(), "Description not equal");


  });


});
