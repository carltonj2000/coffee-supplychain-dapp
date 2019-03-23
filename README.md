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

- Contract Address - 0xcbe1c9028115ca97880e80df6acd13c7cd82a894

| Event    | Transaction Hash                                                   |
| -------- | ------------------------------------------------------------------ |
| Harvest  | 0xc0d1cf9fff05862932e73d2c62176fa415d8f83447c87cf82256105c6e2224d8 |
| Process  | 0x1467cf3a0400cdf516493450ac758f524ff617ab0c5e460a97b45655c3095340 |
| Pack     | 0x5233abc1d150000a37081895981ed89f91a9e96e4f51ce04a224696cf5ca43e8 |
| ForSale  | 0x2447530a0523221be4fc796f583e0975ce79d263669534d3c81884e6f25815b7 |
| Buy      | 0xb429ba1df6ab509df075180b4b459a68908a5799bdbf6982c2ba64923a916d03 |
| Ship     | 0x36f0d6614e4fcb50d70143560ef0b6198362e7eb90affa62df608fcf712b85a4 |
| Receive  | 0xdb7354dc6c6cb8d23eea9ff873e1739a2176950bd962897a275cde0970951106 |
| Purchase | 0x297e44ae35cfbb6e90a2d620bd7fae67357c52a711c135911f21e8e4dc065d1b |

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
