// migrating the appropriate contracts
// var Ownable = artifacts.require("./Ownable.sol");
// var FarmerRole = artifacts.require("./FarmerRole.sol");
// var DistributorRole = artifacts.require("./DistributorRole.sol");
// var RetailerRole = artifacts.require("./RetailerRole.sol");
// var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  // deployer.deploy(Ownable);
  // deployer.deploy(FarmerRole);
  // deployer.deploy(DistributorRole);
  // deployer.deploy(RetailerRole);
  // deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};
