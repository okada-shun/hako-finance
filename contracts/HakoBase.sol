// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HakoOwner.sol";

///@title Hako base
///@notice creditToHako plays the role of "currency".
///@notice A's credit to B = B's debt to A
contract HakoBase is HakoOwner {

  event JoinHako(address indexed newMember, uint256 value);
  event LeaveHako(address indexed member, uint256 value);
  event DepositToken(address indexed member, uint256 value);
  event WithdrawToken(address indexed member, uint256 value);
  event TransferCredit(address indexed from, address indexed to, uint256 value);

  ///@notice Hako contract's address as hako address
  address public hakoAddress;

  ///@notice The number of hako members
  uint256 public memberCount;

  ///@notice Hako member's credit to hako for each account
  mapping(address => uint256) internal creditToHako;

  ///@notice Hako member's debt to hako for each account
  mapping(address => uint256) internal debtToHako;

  ///@notice Hako member's credit to other members for each account
  mapping(address => uint256) internal creditToMember;

  ///@notice Hako member's debt to other members for each account
  mapping(address => uint256) internal debtToMember;

  ///@notice Hako contract address's credit to members as hako address's credit
  ///@notice Equal to member's total debtToHako.
  ///@notice SUM(member's debt to hako) = hako's credit to member
  uint256 internal hakoCredit_;

  ///@notice Hako contract address's debt to members as hako address's debt
  ///@notice Equal to member's total creditToHako.
  ///@notice SUM(member's credit to hako) = hako's debt to member
  uint256 internal hakoDebt_;

  modifier haveNotDebtToHako(address _member) {
    require(debtToHako[_member] == 0);
    _;
  }

  modifier haveNotDebtToMember(address _member) {
    require(debtToMember[_member] == 0);
    _;
  }

  ///@notice Gets the balance of token of hako address.
  function balanceOfHako() public view returns (uint256) {
    return balances[hakoAddress];
  }

  ///@notice Gets hako's credit to member.
  function creditOfHako() public view returns (uint256) {
    return hakoCredit_;
  }

  ///@notice Gets hako's debt to member.
  function debtOfHako() public view returns (uint256) {
    return hakoDebt_;
  }

  ///@notice Gets the amount of creditToHako of the specified address.
  ///@param _member The address to query the amount of.
  ///@return An uint256 representing the amount of creditToHako of the passed address.
  function creditToHakoOf(address _member) public view returns (uint256) {
    return creditToHako[_member];
  }

  ///@notice Gets the amount of debtToHako of the specified address.
  ///@param _member The address to query the amount of.
  ///@return An uint256 representing the amount of debtToHako of the passed address.
  function debtToHakoOf(address _member) public view returns (uint256) {
    return debtToHako[_member];
  }

  ///@notice New member joins hako.
  ///@notice Hako owner can't join.
  ///@param _value The amount of token that new member deposits to hako.
  function joinHako(
    uint256 _value
  ) 
    public 
    onlyNonMember(msg.sender) 
    returns (bool) 
  {
    require(msg.sender != hakoOwner);
    require(_value <= balances[msg.sender]);
    _transfer(msg.sender, hakoAddress, _value);
    _membersCreditToHakoHakosDebtToMember(1, msg.sender, _value);
    memberCount = memberCount.add(1);
    memberCheck[msg.sender] = 1;
    emit JoinHako(msg.sender, _value);
    return true;
  }

  ///@notice Member leaves hako.
  ///@notice The member who has debt can't leave.
  ///@notice The member who is lending his credit can't leave.
  ///@notice All his credit returns to him.
  function leaveHako() 
    public 
    onlyMember(msg.sender) 
    haveNotDebtToHako(msg.sender) 
    haveNotDebtToMember(msg.sender) 
    returns (bool) 
  {
    require(creditToMember[msg.sender] == 0);
    uint256 backValue = creditToHako[msg.sender];
    _withdrawToken(msg.sender, backValue);
    memberCount = memberCount.sub(1);
    memberCheck[msg.sender] = 0;
    emit LeaveHako(msg.sender, backValue);
    return true;
  }

  ///@notice Checks which the address is a member or not.
  ///@param _who The address to be checked.
  ///@return 1 if _who is a member, 0 if not.
  function memberCheckOf(address _who) public view returns (uint256) {
    return memberCheck[_who];
  }

  ///@notice Member deposits his token to hako.
  ///@param _value The amount of token that the member deposits to hako.
  function depositToken(
    uint256 _value
  ) 
    public 
    onlyMember(msg.sender) 
    returns (bool) 
  {
    require(_value <= balances[msg.sender]);
    _transfer(msg.sender, hakoAddress, _value);
    _membersCreditToHakoHakosDebtToMember(1, msg.sender, _value);
    emit DepositToken(msg.sender, _value);
    return true;
  }

  ///@notice Member withdraws token from hako contract.
  ///@param _value The amount of token that the member withdraws from hako.
  function withdrawToken(
    uint256 _value
  ) 
    public 
    haveNotDebtToHako(msg.sender) 
    haveNotDebtToMember(msg.sender) 
    returns (bool) 
  {
    require(_value <= creditToHako[msg.sender]);
    _withdrawToken(msg.sender, _value);
    emit WithdrawToken(msg.sender, _value);
    return true;
  }

  ///@notice The base function to withdraw token from hako.
  ///@param _member The member address who withdraws token from hako.
  ///@param _value The amount of token that the member withdraws from hako.
  function _withdrawToken(address _member, uint256 _value) internal {
    if (_value <= balances[hakoAddress]) {
      _transfer(hakoAddress, _member, _value);
      _membersCreditToHakoHakosDebtToMember(0, _member, _value);
    } else {
      totalSupply_ = totalSupply_.add(_value.sub(balances[hakoAddress]));
      balances[hakoAddress] = _value;
      _transfer(hakoAddress, _member, _value);
      _membersCreditToHakoHakosDebtToMember(0, _member, _value); 
    }
  }

  ///@notice Transfer creditToHako to the other member.
  ///@dev Like as ERC20 token's transfer function.
  ///@param _to The address to transfer creditToHako to.
  ///@param _value The amount of creditToHako to be transferred.
  function transferCredit(
    address _to, 
    uint256 _value
  ) 
    public 
    onlyMember(msg.sender) 
    onlyMember(_to) 
    haveNotDebtToHako(_to) 
    returns (bool) 
  {
    require(_value <= creditToHako[msg.sender]);
    require(_to != address(0));
    _transferCredit(msg.sender, _to, _value);
    emit TransferCredit(msg.sender, _to, _value);
    return true;
  }

  ///@notice The base function to transfer creditToHako from one address to the other address.
  ///@param _from The address to transfer creditToHako from.
  ///@param _to The address to transfer creditToHako to.
  ///@param _value The amount of creditToHako to be transferred.
  function _transferCredit(address _from, address _to, uint256 _value) internal {
    creditToHako[_from] = creditToHako[_from].sub(_value);
    creditToHako[_to] = creditToHako[_to].add(_value);
  }

  ///@notice Operates the amount of member's credit to hako and hako's debt to member.
  /**
  @param _upDown 1 if member's creditToHako increases and hako's debt increases, 
  0 if member's creditToHako decreases and hako's debt decreases.
   */
  ///@param _member The address of member.
  ///@param _value The amount of creditToHako and hakoDebt to increase or decrease.
  function _membersCreditToHakoHakosDebtToMember(
    uint256 _upDown, 
    address _member, 
    uint256 _value
  )  
    internal 
  {
    if (_upDown == 1) {
      creditToHako[_member] = creditToHako[_member].add(_value);
      hakoDebt_ = hakoDebt_.add(_value);
    } else {
      creditToHako[_member] = creditToHako[_member].sub(_value);
      hakoDebt_ = hakoDebt_.sub(_value);
    }
  }

  ///@notice Operates the amount of member's debt to hako and hako's credit to member.
  /**
  @param _upDown 1 if member's debtToHako increases and hako's credit increases, 
  0 if member's debtToHako decreases and hako's credit decreases.
   */
  ///@param _member The address of member.
  ///@param _value The amount of debtToHako and hakoCredit to increase or decrease.
  function _membersDebtToHakoHakosCreditToMember(
    uint256 _upDown, 
    address _member, 
    uint256 _value
  ) 
    internal 
  {
    if (_upDown == 1) {
      debtToHako[_member] = debtToHako[_member].add(_value);
      hakoCredit_ = hakoCredit_.add(_value);
    } else {
      debtToHako[_member] = debtToHako[_member].sub(_value);
      hakoCredit_ = hakoCredit_.sub(_value);
    }
  }

  ///@notice Operates the amount of member's credit to other member and member's debt to other member.
  /**
  @param _upDown 1 if creditor member's creditToMember increases and debtor member's debtToMember increases, 
  0 if creditor member's creditToMember decreases and debtor member's debtToMember decreases.
   */
  ///@param _creditor The address of creditor member.
  ///@param _debtor The address of debtor member.
  ///@param _value The amount of creditToMember and debtToMember to increase or decrease.
  function _membersCreditToMemberMembersDebtToMember(
    uint256 _upDown, 
    address _creditor, 
    address _debtor, 
    uint256 _value
  ) 
    internal 
  {
    if (_upDown == 1) {
      creditToMember[_creditor] = creditToMember[_creditor].add(_value);
      debtToMember[_debtor] = debtToMember[_debtor].add(_value);
    } else {
      creditToMember[_creditor] = creditToMember[_creditor].sub(_value);
      debtToMember[_debtor] = debtToMember[_debtor].sub(_value);
    }
  }
  
}