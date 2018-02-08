var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

//var AssetType = artifacts.require("./AssetType.sol");
//var AssetTypeFactory = artifacts.require("./AssetTypeFactory.sol");
var AssetTypesRegistry = artifacts.require("./AssetTypesRegistry.sol");
var SimpleAssetType = artifacts.require("./SimpleAssetType.sol");
var SimpleAssetTypeFactory = artifacts.require("./SimpleAssetTypeFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  //----
  // deployer.deploy(AssetType); => not needed
  //deployer.deploy(AssetTypeFactory); => not needed

  // deployer.deploy(SimpleAssetType);
  deployer.deploy(AssetTypesRegistry);
  deployer.deploy(SimpleAssetTypeFactory);
};
