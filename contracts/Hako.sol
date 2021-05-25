// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CreditCreation.sol";

///@title Hako
contract Hako is CreditCreation {

  string public name;
  string public symbol;
  uint public decimals;
  
  ///@notice hakoAddress is this contract's address.
  ///@param initialSupply Initial supply of hako token.
  ///@param initialUpperLimit Initial upper limit of borrowing and credit-creation value.
  ///@param hakoName Hako's name.
  ///@param hakoSymbol Hako token's symbol.
  ///@param _decimals decimals of hako token.
  constructor(uint256 initialSupply, uint256 initialUpperLimit, string hakoName, string hakoSymbol, uint256 _decimals) public {
    hakoOwner = msg.sender;
    hakoAddress = address(this);
    totalSupply_ = initialSupply;
    upperLimit = initialUpperLimit;
    name = hakoName;
    symbol = hakoSymbol;
    decimals = _decimals;
    balances[hakoOwner] = initialSupply;
  }
  
}
