const secrets = require("./secrets.js");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    ganachegui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          secrets.rinkeby.mnemonic,
          secrets.rinkeby.rpcServer
        );
      },
      network_id: "4", // Rinkeby ID 4
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.4.25"
    }
  }
};
