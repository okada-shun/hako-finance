// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SafeMath.sol";

///@title Basic token
///@dev Based on ERC20 Basic token
contract BasicToken {
  
  using SafeMath for uint256;

  event Transfer(address indexed from, address indexed to, uint256 value);

  ///@notice The balance of token for each account
  mapping(address => uint256) internal balances;

  ///@notice Total supply of token
  uint256 internal totalSupply_;

  ///@notice Gets the balance of token of the specified address.
  ///@param _owner The address to query the balance of.
  ///@return An uint256 representing the amount owned by the passed address.
  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }
  
  ///@notice Gets the total supply of token.
  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  ///@notice Transfer token for a specified address.
  ///@param _to The address to transfer to.
  ///@param _value The amount to be transferred.
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    require(_to != address(0));
    _transfer(msg.sender, _to, _value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  ///@notice The base function to transfer token from one address to the other address.
  ///@param _from The address to transfer from.
  ///@param _to The address to transfer to.
  ///@param _value The amount to be transferred.
  function _transfer(address _from, address _to, uint256 _value) internal {
    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
  }

}