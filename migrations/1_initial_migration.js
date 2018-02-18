var Migrations = artifacts.require("./Migrations.sol");

var FungibleAssetStore = artifacts.require("./FungibleAssetStore.sol");


module.exports = async function(deployer) {



  await Promise.all([
    deployer.deploy(Migrations),
    //deployer.deploy(FungibleAssetStore)
  ]);

  instances = await Promise.all([
    //FungibleAssetStore.deployed()
  ])

//  let store = instances[0];



  /*results = await Promise.all([
    factory.setAssetTypesRegistry(registry.address)
  ]);

  const addr = await factory.assetTypesRegistry.call();

  console.log('addr: '+addr);*/
};
