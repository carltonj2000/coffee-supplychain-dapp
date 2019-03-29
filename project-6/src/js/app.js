App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: "0x0000000000000000000000000000000000000000",
  sku: 0,
  upc: 0,
  metamaskAccountID: "0x0000000000000000000000000000000000000000",
  ownerID: "0x0000000000000000000000000000000000000000",
  originFarmerID: "0x0000000000000000000000000000000000000000",
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: "0x0000000000000000000000000000000000000000",
  retailerID: "0x0000000000000000000000000000000000000000",
  consumerID: "0x0000000000000000000000000000000000000000",

  init: async function() {
    App.readForm();
    /// Setup access to blockchain
    return await App.initWeb3();
  },

  readForm: function() {
    App.sku = $("#sku").val();
    App.upc = $("#upc").val();
    App.ownerID = $("#ownerID").val();
    App.originFarmerID = $("#originFarmerID").val();
    App.originFarmName = $("#originFarmName").val();
    App.originFarmInformation = $("#originFarmInformation").val();
    App.originFarmLatitude = $("#originFarmLatitude").val();
    App.originFarmLongitude = $("#originFarmLongitude").val();
    App.productNotes = $("#productNotes").val();
    App.productPrice = $("#productPrice").val();
    App.distributorID = $("#distributorID").val();
    App.retailerID = $("#retailerID").val();
    App.consumerID = $("#consumerID").val();

    console.log(
      App.sku,
      App.upc,
      App.ownerID,
      App.originFarmerID,
      App.originFarmName,
      App.originFarmInformation,
      App.originFarmLatitude,
      App.originFarmLongitude,
      App.productNotes,
      App.productPrice,
      App.distributorID,
      App.retailerID,
      App.consumerID
    );
  },

  initWeb3: async function() {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }

    await App.getMetaskAccountID();
    return App.initSupplyChain();
  },

  getMetaskAccountID: function() {
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts(function(err, res) {
        if (err) {
          console.log("MetaMask Account Error:", err);
          return reject(err);
        }
        console.log("getMetaskID:", res);
        App.metamaskAccountID = res[0];
        return resolve(App.metamaskAccountID);
      });
    });
  },

  initSupplyChain: async function() {
    App.bindEvents();
    /// Source the truffle compiled smart contracts
    var jsonSupplyChain = "../../build/contracts/SupplyChain.json";

    /// JSONfy the smart contracts
    return new Promise(resolve => {
      $.getJSON(jsonSupplyChain, function(data) {
        console.log("data", data);
        var SupplyChainArtifact = data;
        App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
        App.contracts.SupplyChain.setProvider(App.web3Provider);

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
        App.fetchEvents();
        resolve();
      });
    });
  },

  bindEvents: function() {
    $(document).on("click", App.handleButtonClick);
  },

  handleButtonClick: async function(event) {
    event.preventDefault();

    const id = $(event.target).data("id");
    if (!id) return;
    var processId = parseInt(id);
    console.log("processId", processId);

    await App.getMetaskAccountID();

    switch (processId) {
      case 1:
        return await App.harvestItem(event);
        break;
      case 2:
        return await App.processItem(event);
        break;
      case 3:
        return await App.packItem(event);
        break;
      case 4:
        return await App.sellItem(event);
        break;
      case 5:
        return await App.buyItem(event);
        break;
      case 6:
        return await App.shipItem(event);
        break;
      case 7:
        return await App.receiveItem(event);
        break;
      case 8:
        return await App.purchaseItem(event);
        break;
      case 9:
        return await App.fetchItemBufferOne(event);
        break;
      case 10:
        return await App.fetchItemBufferTwo(event);
        break;
      case 11:
        return await App.addFarmer(event);
        break;
      case 12:
        return await App.addDistributor(event);
        break;
      case 13:
        return await App.addRetailer(event);
        break;
      case 14:
        return await App.addConsumer(event);
        break;
      case 15:
        return await App.addRoles(event);
        break;
      case 16:
        return await App.sequence(event);
        break;
    }
  },

  harvestItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));
    App.readForm();
    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        console.log(instance.address);
        console.log(App.metamaskAccountID);
        return instance.harvestItem(
          App.upc,
          App.metamaskAccountID,
          App.originFarmName,
          App.originFarmInformation,
          App.originFarmLatitude,
          App.originFarmLongitude,
          App.productNotes,
          { from: App.metamaskAccountID }
        );
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("harvestItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  processItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.processItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("processItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  packItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.packItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("packItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  sellItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        const productPrice = web3.toWei(1, "ether");
        console.log("productPrice", productPrice);
        return instance.sellItem(App.upc, productPrice, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("sellItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  buyItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        const walletValue = web3.toWei(3, "ether");
        console.log(walletValue);
        return instance.buyItem(App.upc, {
          from: App.metamaskAccountID,
          value: walletValue
        });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("buyItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  shipItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.shipItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("shipItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  receiveItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("receiveItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  purchaseItem: function(event) {
    event.preventDefault();
    var processId = parseInt($(event.target).data("id"));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("purchaseItem", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchItemBufferOne: function() {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $("#upc").val();
    console.log("upc", App.upc);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.fetchItemBufferOne(App.upc);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("fetchItemBufferOne", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchItemBufferTwo: function() {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.fetchItemBufferTwo.call(App.upc);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("fetchItemBufferTwo", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchEvents: function() {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function"
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function() {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        var events = instance.allEvents(function(err, log) {
          if (!err)
            $("#ftc-events").append(
              "<li>" + log.event + " - " + log.transactionHash + "</li>"
            );
        });
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addFarmer: function() {
    App.roleId = $("#role").val();
    console.log("role ID", App.roleId);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addFarmer(App.roleId);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("addFarmer", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addDistributor: function() {
    App.roleId = $("#role").val();
    console.log("role ID", App.roleId);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addDistributor(App.roleId);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("addDistributor", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addRetailer: function() {
    App.roleId = $("#role").val();
    console.log("role ID", App.roleId);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addRetailer(App.roleId);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("addRetailer", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addConsumer: function() {
    App.roleId = $("#role").val();
    console.log("role ID", App.roleId);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addConsumer(App.roleId);
      })
      .then(function(result) {
        $("#ftc-item").text(result);
        console.log("addConsumer", result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  /* To use update hardcoded role addresses below. */
  addRoles: async function() {
    try {
      const owner = "0xa60d54a13e8c8e3df2f6f2ca355087cb57b33049";
      const contract = await App.contracts.SupplyChain.deployed();
      const ownerDeployed = await contract.owner();
      if (ownerDeployed !== owner)
        return alert(
          "To use this button modify addRoles - the last function in app.js."
        );

      await contract.addFarmer("0x7d8a2B9E922728cf145d3bc93F2949fBe10a1381");
      await contract.addDistributor(
        "0x23C8C725Bfbd457cE4628f8bD9F8b575A8Bf83Fc"
      );
      await contract.addRetailer("0x4074FF7917749e31E13371b7d9F7842B8c1F1ac3");
      await contract.addConsumer("0xa21697229806F436a6AE94153BF3efff4545B0bc");
      await contract.renounceFarmer();
      await contract.renounceDistributor();
      await contract.renounceRetailer();
      await contract.renounceConsumer();
    } catch (e) {
      console.log("error", e);
    }
  },

  state: 0,
  deployed: null,
  /* To use change debug to true and update hardcoded roles addresses below. */
  sequence: async function() {
    const updateButtonText = () => {
      document.getElementById("button16").innerHTML = `Sequence ${App.state}`;
    };
    try {
      if (App.state === 0) {
        App.state = 1;
        updateButtonText();
        return alert("change to metamask account 0");
      }
      if (App.state === 1) {
        App.state = 2;
        updateButtonText();
        return await App.addRoles();
      }
      if (App.state === 2) {
        App.state = 3;
        updateButtonText();
        return alert("change to metamask account 1");
      }
      if (App.state === 3) {
        App.state = 4;
        updateButtonText();
        return await App.contracts.SupplyChain.deployed()
          .then(function(instance) {
            App.deployed = instance;
            return App.deployed.harvestItem(
              App.upc,
              App.metamaskAccountID,
              App.originFarmName,
              App.originFarmInformation,
              App.originFarmLatitude,
              App.originFarmLongitude,
              App.productNotes
            );
          })
          .then(() =>
            App.deployed.processItem(App.upc, { from: App.metamaskAccountID })
          )
          .then(() =>
            App.deployed.packItem(App.upc, { from: App.metamaskAccountID })
          )
          .then(
            () =>
              console.log("inst", App.deployed) ||
              App.deployed.sellItem(App.upc, web3.toWei(1, "ether"), {
                from: App.metamaskAccountID
              })
          );
      }
      if (App.state === 4) {
        App.state = 5;
        updateButtonText();
        console.log("inst 1", App.deployed);
        return alert("change to metamask account 2");
      }
      console.log("inst 2", App.deployed);
      if (App.state === 5) {
        App.state = 6;
        updateButtonText();
        console.log("inst 3", App.deployed);
        App.deployed
          .buyItem(App.upc, {
            from: App.metamaskAccountID,
            value: web3.toWei(3, "ether")
          })
          .then(result => console.log("buyItem", result));
      }
    } catch (e) {
      console.log("error", e);
    }
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
