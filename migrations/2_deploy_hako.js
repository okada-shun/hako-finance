const Hako = artifacts.require("./Hako.sol");

module.exports = function(deployer) {
  const initialSupply = 1000;
  const initialUpperLimit = 500;
  const hakoName = "HakoPrototype";
  const hakoSymbol = "HKPT";
  const decimals = 0;
  deployer.deploy(Hako, initialSupply, initialUpperLimit, hakoName, hakoSymbol, decimals);
};