const Hako = artifacts.require("./Hako.sol");

module.exports = function(deployer) {
  const initialSupply = 50000;
  const initialUpperLimit = 500;
  const hakoName = "HakoTest";
  const tokenSymbol = "HTKN";
  const decimals = 0;
  deployer.deploy(Hako, initialSupply, initialUpperLimit, hakoName, tokenSymbol, decimals);
};