// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HakoBase.sol";

///@title Lend
///@notice creditToHako-lending between hako members
contract Lend is HakoBase {

  event RegisterBorrowValueDuration(address indexed member, uint256 value, uint256 duration);
  event LendCredit(address indexed from, address indexed to, uint256 value, uint256 duration, uint256 time); 
  event CollectDebtFrom(address indexed creditor, address indexed debtor, uint256 id);
  event ReturnDebtTo(address indexed debtor, address indexed creditor, uint256 id);

  ///@notice A record of creditToHako-lending between hako members
  ///@notice lendRecordId_ is the number of lending count
  ///@notice lendFrom_ is the address to lend creditToHako (= creditor member)
  ///@notice lendTo_ is the address to be lended (= debtor member)
  ///@notice lendValue_ is the amount of creditToHako to be lended
  ///@notice lendDuration_ is the duration of lending
  ///@notice lendTime_ is the time to be done of lending
  ///@notice lendBackChecker_ is 0 if lended credit back, 1 if not back
  struct LendRecord {
    uint256 lendRecordId_;
    address lendFrom_;
    address lendTo_;
    uint256 lendValue_;
    uint256 lendDuration_;
    uint256 lendTime_;
    uint256 lendBackChecker_;
  }

  ///@notice The number of lending count
  ///@notice Added every time lending is done
  uint256 internal lendCount_;
  
  ///@notice Created LendRecords are stored in this
  LendRecord[] public lendRecords;

  /**
  @notice The amount of creditToHako that hako member thinks he wants to borrow, 
  the duration of borrowing that hako member thinks he wants to borrow creditToHako
   */
  mapping(address => uint256[2]) internal borrowValueDuration;

  ///@notice Registers the amount of creditToHako and the duration of borrowing that hako member thinks he wants to borrow
  ///@param _value The amount of creditToHako that the member registers
  ///@param _duration The duration of borrowing that the member registers
  function registerBorrowValueDuration(
    uint256 _value, 
    uint256 _duration
  ) 
    public 
    onlyMember(msg.sender) 
    haveNotDebtToMember(msg.sender) 
    returns (bool) 
  { 
    //require(_value <= 10000);
    uint256 assets = balances[msg.sender].add(creditToHako[msg.sender]).add(creditToMember[msg.sender]);
    uint256 debts = debtToHako[msg.sender].add(debtToMember[msg.sender]);
    require(assets >= debts, "netAssets is minus!");
    uint256 netAssets = assets.sub(debts);
    require(_value <= netAssets, "Value is too much!");
    borrowValueDuration[msg.sender][0] = _value;
    borrowValueDuration[msg.sender][1] = _duration;
    emit RegisterBorrowValueDuration(msg.sender, _value, _duration);
    return true;
  }

  ///@notice Gets the registered borrowValue and borrowDuration of the specified address
  ///@param _member the member address who registered them
  function getBorrowValueDurationOf(address _member) public view returns (uint256[2]) {
    return borrowValueDuration[_member];
  }

  ///@notice Stores lending-record in lendRecords
  ///@notice lendCount_ is lendRecordId
  ///@param _from The address to lend creditToHako (= creditor member)
  ///@param _to The address to be lended (= debtor member)
  ///@param _value The amount of creditToHako to be lended
  ///@param _duration The duration of lending
  function _lendRecording(
    address _from, 
    address _to, 
    uint256 _value, 
    uint256 _duration
  ) 
    internal 
  {
    lendCount_ = lendCount_.add(1);
    lendRecords.push(LendRecord(lendCount_, _from, _to, _value, _duration, now, 1));
  }

  ///@notice Lend some creditToHako to the other member 
  ///@param _to The address to lend to (= debtor, msg.sender is creditor)
  ///@param _value The amount of creditToHako to be lended
  ///@param _duration The duration of lending
  ///@notice msg.sender's(creditor's) creditToMember = _to's(debtor's) debtToMember
  function lendCredit(
    address _to, 
    uint256 _value, 
    uint256 _duration
  ) 
    public 
    onlyMember(msg.sender) 
    onlyMember(_to) 
    haveNotDebtToHako(_to) 
    returns (bool) 
  {
    require(_value <= creditToHako[msg.sender], "Value is too much!");
    require(_to != address(0));
    require(_to != msg.sender, "You can't lend your credit to yourself!");
    require(_value <= borrowValueDuration[_to][0], "Value is over the amount that debtor wants to borrow!");
    require(_duration >= borrowValueDuration[_to][1], "Duration is under the duration that debtor wants to borrow!");
    _transferCredit(msg.sender, _to, _value);
    _membersCreditToMemberMembersDebtToMember(1, msg.sender, _to, _value);
    borrowValueDuration[_to][0] = borrowValueDuration[_to][0].sub(_value);
    _lendRecording(msg.sender, _to, _value, _duration);
    emit LendCredit(msg.sender, _to, _value, _duration, now);
    return true;
  }

  ///@notice Creditor member collects debt from debtor member
  ///@param _debtor The address of debtor member (corresponds to lendCredit function's _to param)
  ///@param _id The number of lendRecordId
  ///@dev Due to _lendRecording function, there is a gap between _id and lendRecords's index
  function collectDebtFrom(address _debtor, uint256 _id) public returns (bool) {
    uint newId = _id.sub(1);
    require(lendRecords[newId].lendBackChecker_ == 1, "BackChecker error!");
    require(msg.sender == lendRecords[newId].lendFrom_, "Lend 'From' error!");
    require(_debtor == lendRecords[newId].lendTo_, "Lend 'To' error!");
    require(now >= lendRecords[newId].lendTime_ + lendRecords[newId].lendDuration_, "LendDuration is yet to be passed!");
    if (creditToHako[_debtor] >= lendRecords[newId].lendValue_) { 
      _transferCredit(_debtor, msg.sender, lendRecords[newId].lendValue_);
      _membersCreditToMemberMembersDebtToMember(0, msg.sender, _debtor, lendRecords[newId].lendValue_);
      lendRecords[newId].lendBackChecker_ = 0;
    } else {
      _membersDebtToHakoHakosCreditToMember(1, _debtor, lendRecords[newId].lendValue_ - creditToHako[_debtor]);
      _membersCreditToHakoHakosDebtToMember(0, _debtor, creditToHako[_debtor]);
      _membersCreditToHakoHakosDebtToMember(1, msg.sender, lendRecords[newId].lendValue_);
      _membersCreditToMemberMembersDebtToMember(0, msg.sender, _debtor, lendRecords[newId].lendValue_);
      lendRecords[newId].lendBackChecker_ = 0;
    }
    emit CollectDebtFrom(msg.sender, _debtor, _id);
    return true;
  }

  ///@notice Debtor member returns his debt to creditor member
  ///@param _creditor The address of creditor member (corresponds to lendCredit function's msg.sender)
  ///@param _id The number of lendRecordId
  ///@dev Due to lendRecording function, there is a gap between _id and lendRecords's index
  function returnDebtTo(address _creditor, uint _id) public returns (bool) {
    uint newId = _id.sub(1);
    require(lendRecords[newId].lendBackChecker_ == 1, "BackChecker error!");
    require(msg.sender == lendRecords[newId].lendTo_, "Lend 'To' error!");
    require(_creditor == lendRecords[newId].lendFrom_, "Lend 'From' error!");
    require(creditToHako[msg.sender] >= lendRecords[newId].lendValue_, "You don't have enough credit!"); 
    _transferCredit(msg.sender, _creditor, lendRecords[newId].lendValue_);
    _membersCreditToMemberMembersDebtToMember(0, _creditor, msg.sender, lendRecords[newId].lendValue_);
    lendRecords[newId].lendBackChecker_ = 0;
    emit ReturnDebtTo(msg.sender, _creditor, _id);
    return true;
  }

  ///@notice Gets lendRecords information
  ///@param _id The number of lendRecordId
  function getLendRecords(
    uint _id
  ) 
    public 
    view 
    returns (uint256, address, address, uint256, uint256, uint256, uint256) 
  {
    uint newId = _id.sub(1);
    return (
      lendRecords[newId].lendRecordId_, 
      lendRecords[newId].lendFrom_, 
      lendRecords[newId].lendTo_, 
      lendRecords[newId].lendValue_, 
      lendRecords[newId].lendDuration_, 
      lendRecords[newId].lendTime_, 
      lendRecords[newId].lendBackChecker_
    );
  }
  
  ///@notice Gets the amount of creditToMember of the specified address
  ///@param _creditor The address to query the amount of creditToMember
  function creditToMemberOf(address _creditor) public view returns (uint256) {
    return creditToMember[_creditor];
  }

  ///@notice Gets the amount of debtToMember of the specified address
  ///@param _debtor The address to query the amount of debtToMember
  function debtToMemberOf(address _debtor) public view returns (uint256) {
    return debtToMember[_debtor];
  }

  ///@notice Gets lendRecordId of creditor member's credit to other member
  function getCreditToMemberIds() public view returns (uint256[]) {
    uint256[] memory creditToMemberIds = new uint256[](lendRecords.length);
    uint256 counter = 0;
    for (uint i; i < lendRecords.length; i++) {
      if (lendRecords[i].lendFrom_ == msg.sender && lendRecords[i].lendBackChecker_ == 1) {
        creditToMemberIds[counter] = lendRecords[i].lendRecordId_;
        counter = counter.add(1);
      }
    }
    return creditToMemberIds;
  }

  ///@notice Gets lendRecordId of debtor member's debt to other member
  function getDebtToMemberIds() public view returns (uint256[]) {
    uint256[] memory debtToMemberIds = new uint256[](lendRecords.length);
    uint256 counter = 0;
    for (uint i; i < lendRecords.length; i++) {
      if (lendRecords[i].lendTo_ == msg.sender && lendRecords[i].lendBackChecker_ == 1) {
        debtToMemberIds[counter] = lendRecords[i].lendRecordId_;
        counter = counter.add(1);
      }
    }
    return debtToMemberIds;
  }

}