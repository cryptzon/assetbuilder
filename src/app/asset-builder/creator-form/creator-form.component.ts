import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';

import simpleAsset_artifacts from '../../../../build/contracts/SimpleAsset.json';
//const simpleAsset_artifacts = require('../../../../build/contracts/SimpleAsset.json');

import testContract_artifacts from '../../../../build/contracts/TestContract.json';


@Component({
  selector: 'app-creator-form',
  templateUrl: './creator-form.component.html',
  styleUrls: ['./creator-form.component.css']
})
export class CreatorFormComponent implements OnInit {

  SimpleAssetContract: any;
  TestContract: any;

  model = {
    name: '',
    totalSupply: 0,
    description: ''
  };

  status = '';


  constructor(private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    console.log(simpleAsset_artifacts);

    this.web3Service.artifactsToContract(simpleAsset_artifacts)
      .then((simpleAssetContractAbstraction) => {
        this.SimpleAssetContract = simpleAssetContractAbstraction;
      }
    );

    this.web3Service.artifactsToContract(testContract_artifacts)
      .then((testContractAbstraction) => {
        this.TestContract = testContractAbstraction;
      }
    );
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

  createAsset() {
    console.log("On createAsset!");

    console.log("Asset Name: "+this.model.name);
    console.log("Total Supply: "+this.model.totalSupply);
    console.log("Description: "+this.model.description);
    //this.SimpleAssetContract.new(this.model.name,this.model.totalSupply,this.model.description, {gas: 90000*2},

    this.TestContract.new({gas: 90000*2},
      (err, res) => {
        console.log(res);
        console.log(res.transactionHash);
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
    });
  }

}
