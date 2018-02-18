var Migrations = artifacts.require("./Migrations.sol");

var FungibleAssetStore = artifacts.require("./FungibleAssetStore.sol");


module.exports = async function(deployer, network, accounts) {
  //console.log(accounts);
  let storeName = "Aliens Invasion";
  let storeUrl = "https://github.com/cykod/AlienInvasion.git";

  let owner = accounts[9];
  let firstPlayer = accounts[0];
  let secondPlayer = accounts[1];
  await Promise.all([
    deployer.deploy(Migrations),
    deployer.deploy(FungibleAssetStore, storeName, storeUrl, {from: owner})
  ]);

  instances = await Promise.all([
    FungibleAssetStore.deployed()
  ])

  let store = instances[0];

  let propertiesSpaceship1 = JSON.stringify({spriteImage: "images/sprites/mfalcon.png"});
  let propertiesSpaceship2 = JSON.stringify({spriteImage: "images/sprites/enterprise.png"});
  let propertiesSpaceship3 = JSON.stringify({spriteImage: "images/sprites/tfighter.png"});

  //console.log(store);
  results = await Promise.all([
    store.createAssetType("MFalcon 2178", "Star Wars Falcon for Alien invasion.", "images/assets/mfalcon.png", "gamming", 100, propertiesSpaceship1.toString(), {from: owner}),
    store.createAssetType("MFalcon 21718", "Star Trek Enterprise for Alien Invasion. Boldy go where no alien has gone before.", "images/assets/enterprise.png", "gamming", 100, propertiesSpaceship2.toString(), {from: owner}),
    store.createAssetType("TFighter", "Star Wars Fighter. Destroying rebel scum everywhere.", "images/assets/tfighter.png", "gamming", 100, propertiesSpaceship3.toString(), {from: owner}),
    store.transfer(firstPlayer, 0, {from: owner}),
    store.transfer(firstPlayer, 100, {from: owner}),
    store.transfer(firstPlayer, 200, {from: owner}),
    store.transfer(secondPlayer, 1, {from: owner}),
    store.transfer(secondPlayer, 201, {from: owner})
  ]);


  const addr = await store.address;
  const ownerContract = await store.owner.call();
  console.log('AlienInvasion Smart Contract Address: '+addr);
  console.log('AlienInvasion Smart Contract Owner: '+ownerContract);


  /*results = await Promise.all([
    factory.setAssetTypesRegistry(registry.address)
  ]);

  const addr = await factory.assetTypesRegistry.call();

  console.log('addr: '+addr);*/
};
