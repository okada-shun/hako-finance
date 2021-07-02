// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./BasicToken.sol";

///@title Hako owner
///@dev Hako owner can change owner position to other account.
///@dev Hako owner can change upper limit of borrowing and credit-creation value.
///@dev Hako owner can get 1% token owned by hako as reward every 24 hours.
contract HakoOwner is BasicToken {

  using SafeMath for uint256;

  event ChangeHakoOwner(address indexed oldHakoOwner, address indexed newHakoOwner);
  event ChangeUpperLimit(address indexed hakoOwner, uint256 newUpperLimit);
  event GetReward(address indexed hakoOwner, uint256 rewardValue);

  ///@notice Hako contract's address as hako address
  address public hakoAddress;

  ///@notice Hako owner's address
  address public hakoOwner;

  ///@notice Upper limit of borrowing and credit-creation value
  uint256 public upperLimit;

  ///@notice 1 if the address is a member, 0 if not.
  mapping(address => uint256) internal memberCheck;

  ///@notice Time that hako owner get reward.
  uint256 public rewardTime;

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

  ///@notice Gets the balance of token of hako owner.
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

  ///@notice Hako owner gets 1% token owned by hako as reward every 24 hours.
  function getReward() public onlyHakoOwner returns (bool) {
    uint256 readyTime = rewardTime.add(86400);
    require(block.timestamp >= readyTime);
    uint256 rewardValue = balances[hakoAddress].div(100);
    _transfer(hakoAddress, hakoOwner, rewardValue);
    rewardTime = block.timestamp;
    emit GetReward(msg.sender, rewardValue);
    return true;
  }
  
}