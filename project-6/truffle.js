module.exports = {
  networks: {
    ganachegui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.4.25"
    }
  }
};
