var SimpleAssetTypeFactory = artifacts.require("SimpleAssetTypeFactory");
var SimpleAssetType = artifacts.require("SimpleAssetType");
var AssetTypesRegistry = artifacts.require("AssetTypesRegistry");

contract("SimpleAssetTypeFactory", async function(accounts) {
  /*
  const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );*/


  let toAscii = function(str) {
    return web3.toAscii(str).replace(/\u0000/g, '');
  }

  it("should ensure the factory has the registry set", async function() {
    const factory = await SimpleAssetTypeFactory.deployed();
    const registry = await AssetTypesRegistry.deployed();

    let factoryRegistryAddress = await factory.assetTypesRegistry.call();
    console.log("factory:"+factory.address);
    console.log("registry:"+registry.address);
    console.log("factoryRegistryAddress:"+factoryRegistryAddress);
    assert.equal(factoryRegistryAddress, registry.address, "Register address stored in the factory is not the one deployed");

  });
  it("should create a new asset type and verify values stored", async function() {
    const factory = await SimpleAssetTypeFactory.new({from: accounts[0]});
    const registry = await AssetTypesRegistry.new({from: accounts[0]});
    await factory.setAssetTypesRegistry(registry.address, {from: accounts[0]});

    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await registry.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(toAscii(await simpleAssetContract.assetType.call()), "SimpleAssetType", "Asset type does not match");

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");
  });


  it("should create 3 new asset type from same owner and verify values stored", async function() {
    const factory = await SimpleAssetTypeFactory.new({from: accounts[0]});
    const registry = await AssetTypesRegistry.new({from: accounts[0]});
    await factory.setAssetTypesRegistry(registry.address, {from: accounts[0]});


    // asset #1
    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await registry.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");

    // asset #2
    name = "Test2";
    totalSupply = 10;
    description = "This is a test 2!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    assetsFromOwner = await registry.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 2, "Assets from owner not 2");

    simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[1]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");

    // asset #3
    name = "Test3";
    totalSupply = 50;
    description = "This is a test 3!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    assetsFromOwner = await registry.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 3, "Assets from owner not 3");

    simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[2]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");

  });

  it("should create 3 new asset type from different owners and verify values stored", async function() {
    const factory = await SimpleAssetTypeFactory.new({from: accounts[0]});
    const registry = await AssetTypesRegistry.new({from: accounts[0]});
    await factory.setAssetTypesRegistry(registry.address, {from: accounts[0]});

    // asset #1
    let name = "Test1";
    let totalSupply = 1000;
    let description = "This is a test!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[0]});

    let assetsFromOwner = await registry.getAssetsFromOwner(accounts[0]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    let simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");

    // asset #2
    name = "Test2";
    totalSupply = 10;
    description = "This is a test 2!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[1]});

    assetsFromOwner = await registry.getAssetsFromOwner(accounts[1]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");

    // asset #3
    name = "Test3";
    totalSupply = 50;
    description = "This is a test 3!";

    await factory.createSimpleAssetType(name, totalSupply, description, {from: accounts[2]});

    assetsFromOwner = await registry.getAssetsFromOwner(accounts[2]);

    assert.equal(assetsFromOwner.length, 1, "Assets from owner not 1");

    simpleAssetContract = await SimpleAssetType.at(assetsFromOwner[0]); //assetsFromOwner[0]

    assert.equal(name, toAscii(await simpleAssetContract.name.call()), "Name not equal");
    assert.equal(totalSupply, await simpleAssetContract.totalSupply.call(), "TotalSupply not equal");
    assert.equal(description, toAscii(await simpleAssetContract.description.call()), "Description not equal");


  });
});
