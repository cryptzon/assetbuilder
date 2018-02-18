var FungibleAssetStore = artifacts.require("FungibleAssetStore");

contract("AssetType", async function(accounts) {

  let toAscii = function(str) {
    return web3.toAscii(str).replace(/\u0000/g, '');
  }

  let getEvent = function(logs, eventName) {
    let size = logs.length;
    for(i = 0; i < size; i++) {
      if(logs[i].event == eventName){
        return logs[i];
      }
    }
  }

  let countEvents = function(logs, eventName) {
    let size = logs.length;
    let count = 0;
    for(i = 0; i < size; i++) {
      if(logs[i].event == eventName){
        count++;
      }
    }
    return count;
  }

  describe('FungibleAssetStore - Creation', () => {
    let contract;
    /*beforeEach(async function() {
      contract = await
    })*/
    it("should create a new store and check name and url", async function() {
      let storeName = "MyStore";
      let storeUrl = "http://my.store";
      const contract = await FungibleAssetStore.new(storeName, storeUrl);

      let nameStored = await contract.name.call();
      let urlStored = await contract.url.call();

      assert.equal(storeName, nameStored, "Store name is not correct");
      assert.equal(storeUrl, urlStored, "Store url is not correct");
    });

  });

  describe('FungibleAssetStore - New Asset Type', () => {
    let contract;
    let owner = accounts[1];
    let firstPlayer = accounts[0];
    let secondPlayer = accounts[2];
    /*beforeEach(async function() {
      contract = await
    })*/
    it("should create a new asset type and verify the tokens are created", async function() {
      let storeName = "MyStore";
      let storeUrl = "http://my.store";

      let title = "MyAssetType";
      let description = "Asset Description";
      let imageUrl = "http://my.store/asset.png";
      let assetType = "gamming";
      let supply = 10;
      let properties = JSON.stringify({prop1 : 123, prop2 : "121"});
      console.log(properties);
      const contract = await FungibleAssetStore.new(storeName, storeUrl, {from: owner});

      let tx = await contract.createAssetType(title, description, imageUrl, assetType, supply, properties, {from: owner});
      let event = getEvent(tx.logs, "AssetTypeCreated");
      let eventName = event.event;
      let assetTypeId = event.args.assetTypeId.toString();
      let titleEvent = event.args.title;
      let fromTokenId = event.args.fromTokenId.toString();
      let toTokenId = event.args.fromTokenId.toString();

      assert.equal(eventName, "AssetTypeCreated", "Event should be AssetTypeCreated");
      assert.equal(assetTypeId, 1, "Asset Type Id should be 0");
      assert.equal(title, titleEvent, "Asset Title is not correct");

      let asset = await contract.getAssetType.call(assetTypeId,{from: owner});

      let titleA = asset[0];
      let descriptionA = asset[1];
      let imageUrlA = asset[2];
      let assetTypeA = asset[3];
      let supplyA = asset[4].toString();
      let propertiesA = asset[5];
      console.log(propertiesA);

      assert.equal(titleA, title, "Title not correct");
      assert.equal(descriptionA, description, "Description not correct");
      assert.equal(imageUrlA, imageUrl, "Image URL not correct");
      assert.equal(assetTypeA, assetType, "Asset Type not correct");
      assert.equal(supplyA, supply, "Supply not correct");
      assert.equal(propertiesA, properties, "Properties not correct");

      let countTransferEvents = countEvents(tx.logs, "Transfer");
      assert.equal(countTransferEvents, supply, "Did not receive the correct amount of Transfer events");

      let tokensOwned = await contract.tokensOf.call(owner);
      assert.equal(supply, tokensOwned.length, "Owner does not own the correct amount of tokens");

      for(i = 0; i < tokensOwned.length; i++) {
        let tokenId = tokensOwned[i].toNumber();
        let assetType = await contract.getAssetTypeFromTokenId.call(tokenId, {from:owner});
        titleA = assetType[0];
        assert.equal(titleA, title, "Title not correct");
      }
    });


    it("should create a new asset type and transfer to another account", async function() {
      let storeName = "MyStore";
      let storeUrl = "http://my.store";

      let title = "MyAssetType";
      let description = "Asset Description";
      let imageUrl = "http://my.store/asset.png";
      let assetType = "gamming";
      let supply = 10;
      let properties = JSON.stringify({prop1 : 123, prop2 : "121"});


      const contract = await FungibleAssetStore.new(storeName, storeUrl, {from: owner});

      await contract.createAssetType(title, description, imageUrl, assetType, supply, properties, {from: owner});

      await contract.transfer(firstPlayer, 0, {from:owner});

      let tokensOwned = await contract.tokensOf.call(owner);
      assert.equal(supply-1, tokensOwned.length, "Owner does not own the correct amount of tokens");

      let firstPlayerTokensOwned = await contract.tokensOf.call(firstPlayer);
      assert.equal(1, firstPlayerTokensOwned.length, "First Player does not own the correct amount of tokens");

    });

    it("should get the tokens owned by index", async function() {
      let storeName = "MyStore";
      let storeUrl = "http://my.store";

      let title = "MyAssetType";
      let description = "Asset Description";
      let imageUrl = "http://my.store/asset.png";
      let assetType = "gamming";
      let supply = 10;
      let properties = JSON.stringify({prop1 : 123, prop2 : "121"});


      let title1 = "MyAssetType1";
      let title2 = "MyAssetType2";


      const contract = await FungibleAssetStore.new(storeName, storeUrl, {from: owner});

      await contract.createAssetType(title, description, imageUrl, assetType, supply, properties, {from: owner});
      await contract.createAssetType(title1, description, imageUrl, assetType, supply, properties, {from: owner});
      await contract.createAssetType(title2, description, imageUrl, assetType, supply, properties, {from: owner});

      let tokenId1 = 0;
      let tokenId2 = 10;
      let tokenId3 = 23;

      await contract.transfer(firstPlayer, tokenId1, {from:owner});
      await contract.transfer(firstPlayer, tokenId2, {from:owner});
      await contract.transfer(firstPlayer, tokenId3, {from:owner});

      let balance = await contract.balanceOf.call(firstPlayer);
      assert.equal(balance.toNumber(), 3, "Balance is not correct");

      let asset0 = await contract.getAssetTypeFromIndex.call(firstPlayer, 0);
      let asset1 = await contract.getAssetTypeFromIndex.call(firstPlayer, 1);
      let asset2 = await contract.getAssetTypeFromIndex.call(firstPlayer, 2);

      assert.equal(asset0[0].toNumber(), tokenId1, "TokenId first asset not correct");
      assert.equal(asset1[0].toNumber(), tokenId2, "TokenId second asset not correct");
      assert.equal(asset2[0].toNumber(), tokenId3, "TokenId third asset not correct");


      assert.equal(asset0[1], title, "Title first asset not correct");
      assert.equal(asset1[1], title1, "Title second asset not correct");
      assert.equal(asset2[1], title2, "Title third asset not correct");

    });

  });
});
