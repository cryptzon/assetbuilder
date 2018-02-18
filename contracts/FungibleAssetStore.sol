pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract FungibleAssetStore is ERC721Token, Ownable {


  event AssetTypeCreated(uint assetTypeId, string title, uint fromTokenId, uint toTokenId);
  /*
  title
  description
  image
  asset type
  Supply
  prices


  store
  Name
  url
  */
  string public name;
  string public url;

  struct FungibleAssetType  {
    string title;
    string description;
    string imageUrl; //potentially can be a bytes 32
    string assetType;
    uint supply;
    string properties;
  }

  struct FungibleAssetTypeTokensIds {
    uint fromTokenId;
    uint toTokenId;
  }
  // array registering all asset types managed by this store
  FungibleAssetType[] public assetTypes;

  //
  mapping (uint => FungibleAssetTypeTokensIds) assetTypesTokenIds;

  //mapping between the tokenId and assetTypeId
  mapping (uint => uint) tokenIdAssetTypeId;

  /*function SimpleAssetType(bytes32 _name, uint _totalSupply, bytes32 _description) public AssetType("SimpleAssetType")  {
    name = _name;
    totalSupply = _totalSupply;
    description = _description;
  }*/

  function FungibleAssetStore(string _name, string _url) public {
    name = _name;
    url = _url;
  }

  function createAssetType(string _title, string _description, string _imageUrl, string _assetType, uint _supply, string _properties) public{
    FungibleAssetType memory asset = FungibleAssetType({
        title: _title,
        description: _description,
        imageUrl: _imageUrl,
        assetType: _assetType,
        supply: _supply,
        properties: _properties
    });
    uint assetTypeId = assetTypes.push(asset);


    uint startTokenId = totalSupply();
    uint lastTokenId = startTokenId + _supply - 1;
    for(uint tokenId = startTokenId; tokenId <= lastTokenId; tokenId++) {
      _mint(msg.sender, tokenId);
      tokenIdAssetTypeId[tokenId] = assetTypeId;
    }

    FungibleAssetTypeTokensIds memory tokensIds = FungibleAssetTypeTokensIds({
      fromTokenId: startTokenId,
      toTokenId: lastTokenId
    });
    assetTypesTokenIds[assetTypeId] = tokensIds;

    AssetTypeCreated(assetTypeId, _title, startTokenId, lastTokenId);
  }

  function getAssetType(uint _assetTypeId) public view returns (string title, string description, string imageUrl, string assetType, uint supply, string properties) {
    require(_assetTypeId <= assetTypes.length);
    FungibleAssetType storage asset = assetTypes[_assetTypeId-1];
    return (asset.title, asset.description, asset.imageUrl, asset.assetType, asset.supply, asset.properties);
  }

  function getAssetTypeFromTokenId(uint _tokenId) public view returns (string title, string description, string imageUrl, string assetType, uint supply, string properties) {
    uint assetTypeId = tokenIdAssetTypeId[_tokenId];
    return getAssetType(assetTypeId);
  }

  function getAssetTypeFromIndex(address _owner, uint _index) public view returns (uint tokenId, string title, string description, string imageUrl, string assetType, uint supply, string properties) {
    uint[] memory tokenIds = tokensOf(_owner);
    require(_index < tokenIds.length);
    uint _tokenId = tokenIds[_index];
    uint assetTypeId = tokenIdAssetTypeId[_tokenId];
    FungibleAssetType storage asset = assetTypes[assetTypeId-1];
    return (_tokenId, asset.title, asset.description, asset.imageUrl, asset.assetType, asset.supply, asset.properties);

  }
}
