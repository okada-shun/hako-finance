// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./BasicToken.sol";

///@title Hako owner
///@dev Hako owner can change owner position to the other account.
///@dev Hako owner can change upper limit of borrowing and credit-creation value.
contract HakoOwner is BasicToken {

  event ChangeHakoOwner(address indexed oldHakoOwner, address indexed newHakoOwner);
  event ChangeUpperLimit(address indexed hakoOwner, uint256 newUpperLimit);

  ///@notice Hako owner's address
  address public hakoOwner;

  ///@notice Upper limit of borrowing and credit-creation value
  uint256 public upperLimit;

  ///@notice 1 if the address is a member, 0 if not.
  mapping(address => uint256) internal memberCheck;

  modifier onlyHakoOwner() {
    require(msg.sender == hakoOwner);
    _;
  }

  modifier onlyMember(address _who) {
    require(memberCheck[_who] == 1);
    _;
  }

  modifier onlyNonMember(address _who) {
    require(memberCheck[_who] == 0);
    _;
  }

  ///@notice Gets the balance of token of hako owner's address.
  function balanceOfHakoOwner() public view returns (uint256) {
    return balances[hakoOwner];
  }

  ///@notice Changes hako owner to new owner.
  ///@notice Hako member can't be new hako owner.
  ///@param _newHakoOwner The address of new hako owner.
  function changeHakoOwner(
    address _newHakoOwner
  ) 
    public 
    onlyHakoOwner 
    onlyNonMember(_newHakoOwner) 
    returns (bool) 
  {
    require(_newHakoOwner != address(0));
    hakoOwner = _newHakoOwner;
    emit ChangeHakoOwner(msg.sender, _newHakoOwner);
    return true;
  }

  ///@notice Changes upper limit of borrowing and credit-creation value.
  ///@notice Only hako owner can do.
  ///@param _value The value of new upper limit.
  function changeUpperLimit(
    uint256 _value
  ) 
    public 
    onlyHakoOwner 
    returns (bool) 
  {
    upperLimit = _value;
    emit ChangeUpperLimit(msg.sender, _value);
    return true;
  }
  
}