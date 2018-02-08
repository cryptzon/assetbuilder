var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

//var AssetType = artifacts.require("./AssetType.sol");
//var AssetTypeFactory = artifacts.require("./AssetTypeFactory.sol");
var AssetTypesRegistry = artifacts.require("./AssetTypesRegistry.sol");
var SimpleAssetType = artifacts.require("./SimpleAssetType.sol");
var SimpleAssetTypeFactory = artifacts.require("./SimpleAssetTypeFactory.sol");
/*
module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  //----
  // deployer.deploy(AssetType); => not needed
  //deployer.deploy(AssetTypeFactory); => not needed

  // deployer.deploy(SimpleAssetType);
  deployer.deploy(AssetTypesRegistry);
  deployer.deploy(SimpleAssetTypeFactory).then(()=> {
    let factory = SimpleAssetTypeFactory.deployed();
    factory.setAssetTypesRegistry(AssetTypesRegistry.address);
  });

  /*let registry = await AssetTypesRegistry.deployed();
  let factory = await SimpleAssetTypeFactory.deployed();

  console.log("registry:"+registry.address);
  factory.setAssetTypesRegistry(registry.address);

  let reg = await factory.assetTypesRegistry.call();
  console.log("factoryRegistryAddress:"+reg);
  */
//};


module.exports = async function(deployer) {
  await Promise.all([
    deployer.deploy(AssetTypesRegistry),
    deployer.deploy(SimpleAssetTypeFactory)
  ]);

  instances = await Promise.all([
    AssetTypesRegistry.deployed(),
    SimpleAssetTypeFactory.deployed()
  ])

  let registry = instances[0];
  let factory = instances[1];

  results = await Promise.all([
    factory.setAssetTypesRegistry(registry.address)
  ]);

  const addr = await factory.assetTypesRegistry.call();

  console.log('addr: '+addr);
};
