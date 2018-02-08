import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

import simpleAsset_artifacts from '../../../../build/contracts/SimpleAsset.json';
import assetFactory_artifacts from '../../../../build/contracts/AssetFactory.json';


@Component({
  selector: 'app-creator-form',
  templateUrl: './creator-form.component.html',
  styleUrls: ['./creator-form.component.css']
})
export class CreatorFormComponent implements OnInit {

  AssetFactory: any;
  accounts: string[];

  model = {
    name: '',
    totalSupply: 0,
    description: '',
    account: ''
  };

  status = '';

  constructor(private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);

    // subscribe to watch account change in metamask
    this.watchAccount();

    // get AssetFactory contract
    this.web3Service.artifactsToContract(assetFactory_artifacts)
      .then((contractAbstraction) => {
        this.AssetFactory = contractAbstraction;
      }
    );
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    //TODO: List assets created buy the selected Address

    /*try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.model.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }*/
  }

  setStatus(status) {
    this.status = status;
  }

  setName(e) {
    console.log('Setting name: ' + e.target.value);
    this.model.name = e.target.value;
  }
  setTotalSupply(e) {
    console.log('Setting totalSupply: ' + e.target.value);
    this.model.totalSupply = e.target.value;
  }
  setDescription(e) {
    console.log('Setting description: ' + e.target.value);
    this.model.description = e.target.value;
  }

  async createAsset() {
    console.log("On createAsset!");

    console.log("Asset Name: "+this.model.name);
    console.log("Total Supply: "+this.model.totalSupply);
    console.log("Description: "+this.model.description);

    this.setStatus('Registering contract... (please wait)');

    try {
      const deployedAssetFactory = await this.AssetFactory.deployed();

      //TODO: handle the creation of new asset
      const transaction = await deployedAssetFactory.registerSimpleAssetType(this.model.name,this.model.totalSupply,this.model.description,
        {gas: 90000*2, from:this.model.account});

      /*if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }*/
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
/*
    debugger;
    this.AssetFactory.registerSimpleAssetType(this.model.name,this.model.totalSupply,this.model.description, {gas: 90000*2},
      (err, res) => {
        console.log(res);
        console.log(res.transactionHash);
        debugger;
        /*web3.eth.getTransactionReceipt(res.transactionHash, (err2, res2) => {
            if (err) {
                console.log(err2);
                return;
            }
            console.log(res2);
            let address = res2.contractAddress;
            if (address) {
                console.log('Contract address: ' + address);
                // Let's test the deployed contract
                //testContract(address);
                let deployedContract = contract.at(address);
                debugger;
                //deployedContract.g.call((err3, res3) => {console.log(res3)});
            }
          });*/
    //});
  }

}
