const Hako = artifacts.require("./Hako.sol");

module.exports = function(deployer) {
  const initialSupply = 1000;
  const initialUpperLimit = 500;
  const hakoName = "HakoPrototype";
  const hakoSymbol = "HKPT";
  deployer.deploy(Hako, initialSupply, initialUpperLimit, hakoName, hakoSymbol);
}