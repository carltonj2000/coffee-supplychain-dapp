# Supply chain DAPP

A coffee bean supply chain is tracked via this Ethereum DAPP.
The DAPP was completed for the
[Udacity Blockchain Term 2 Project 6 Part B](https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309).
The diagrams for Part A are in the
[Coffee Supplly Chain Diagrams](Coffee-Supply-Chain-Diagrams)
section towards the end of this document.
The initial skeleton code use in this repository is provided by Udacity from
[here](https://github.com/udacity/nd1309-Project-6b-Example-Template).

## Software Versions Used

- Truffle v4.1.15 (core: 4.1.15)
- Solidity v0.4.25 (solc-js)

# Rinkeby Results

The contract addresses and transaction hashs follow.

- Contract Address - 0x779f84144b1eb3fd246643f2a3c0191c28931a7e

| Event    | Transaction Hash                                                   |
| -------- | ------------------------------------------------------------------ |
| Harvest  | 0x01950240a57ce4cfc04ae24626a2d8ca3b76e8a8c9eb4374313acbdd2b1fc919 |
| Process  | 0x85e7ff00e86dc95adf96c9e32c294c3577a953e2d3b9c24e4491fe5576c97fc2 |
| Pack     | 0xdc4b04888dd49a141958cb902f514ff68cb7adb56a04180ef983f311c6524562 |
| ForSale  | 0xa9b6b2d19ff21c296ef197af1767955a22af7136e65a501ab598eeac57305394 |
| Buy      | 0xed18afbca3109e5373c7594594bab7d476f02f200c4026b6893bc71802f49a8c |
| Ship     | 0xfc983d13155907a1f2a7e98d51797fa01acd22bfe5c0d2a0ea6ef44c3cc7fe90 |
| Receive  | 0xbaa6118809740609cd9b1a1ae821956507bb63d7ea91392b5658c01a59aad704 |
| Purchase | 0x508669ba5e69cb11a2641663a1e7a17223291297528889313b29f6d975a8fcc7 |

## Local Test Instructions

- Install the truffle version specified in the
  [Software Version Used](#Software-Versions-Used)
  section.
- Install the browser extension [MetaMask](https://metamask.io/).
- Start the `Ganache GUI`.
- Import the accounts from the `Ganache GUI` to metamask.
- If accounts were previously imported and if necessary in `MetaMask` all the
  accounts can be reset via `Settings`->`Reset Account`.
- All the following commands should be run in the `project-6` directory.
- Run the contract tests via: `truffle test --network ganachegui`.
- Deploy the contract by running either of the following commands:
  `truffle migrate --compile-all --reset --network ganachegui` or
  `truffle migrate --compile-all --reset --network rinkeby`.
- Start the GUI by running `npm run dev`.
- Use the web browser button in the following order to verify the contract:
  - Harvest
  - Process
  - Pack
  - ForSale
  - Buy
  - Ship
  - Receive
  - Purchase
  - Fetch Data 1
  - Fetch Data 2
- Note that role IDs shown in the web browser GUI are not used because
  the metamask role IDs are used.
- Roles can be added via the `Add Role` section of the web GUI.
  For repetitive testing the `Auto` button can be used after the role account
  ID are updated/hardcoded in `addRoles` function at the end of app.js.
- The [Sequence Diagram](#Sequence) show the sequence the contract follows.

## Coffee Supplly Chain Diagrams

### Sequence

![](images/CoffeeSequence.png)

### Activity

![](images/CoffeeActivity.png)

### State

![](images/CoffeeState.png)

### Class

![](images/CoffeeClass.png)

# Notes

Can ignore everything below this as I use it as a scratch pad.

Read Student Hub from March 22/2019 on, as I read all previous comments.

Old contract addresses

- 0x028454b782ef787d2848fdc85984e98d008cb6ca
