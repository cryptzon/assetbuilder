# assetbuilder
Dapp for creating custom crypto-assets

## Set up

Install dependencies:

```
npm install
```

Run your TestRPC client

`testrpc -l 1000000000`
Note the mnemonic 12-word phrase printed on startup, you will need it later.


Compile and migrate your smart contracts:

`truffle compile && truffle migrate`

1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the testrpc test accounts in MetaMask, using the 12-word phrase printed earlier.
    * Normally, the available test accounts will change whenever you restart testrpc.
    * In order to receive the same test accounts every time you start testrpc, start it with a seed like this: `testrpc --seed 0 or testrpc -m "put your mnemonic phrase here needs twelve words to work with MetaMask"`
3. Point MetaMask to testrpc by connecting to the network localhost:8545


## Run

`ng serve`

Making sure you have configured MetaMask, visit http://localhost:4200 in your browser.

## Testing

Running the Angular component tests:

`ng test`

Running the Truffle tests:

`truffle test`

## Releasing
Using the Angular CLI you can build a distributable of your app. Will be placed in dist/

`ng build`
