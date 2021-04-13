// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Lend.sol";

///@title Credit creation
///@notice Creates creditToHako(debtToHako)
contract CreditCreation is Lend {

  event CreditCreationByMember(address indexed member, uint256 value);
  event Arrangement(address indexed member, uint256 value);

  ///@notice Hako member creates creditToHako(debtToHako)
  ///@param _value The amount of credit(debt) to be created
  function creditCreationByMember(
    uint256 _value
  ) 
    public 
    onlyMember(msg.sender) 
    haveNotDebtToHako(msg.sender) 
    returns (bool) 
  {
    //require(_value <= 10000);
    uint256 assets = balances[msg.sender].add(creditToHako[msg.sender]).add(creditToMember[msg.sender]);
    uint256 debts = debtToHako[msg.sender].add(debtToMember[msg.sender]);
    require(assets >= debts, "netAssets is minus!");
    uint256 netAssets = assets.sub(debts);
    require(_value <= netAssets, "Value is too much!");
    _membersCreditToHakoHakosDebtToMember(1, msg.sender, _value);
    _membersDebtToHakoHakosCreditToMember(1, msg.sender, _value);
    emit CreditCreationByMember(msg.sender, _value);
    return true;
  }

  ///@notice Reduce debtToHako by reducing creditToHako
  ///@param _value The amount of creditToHako(and debtToHako) to be reduced
  function arrangement(uint256 _value) public returns (bool) {
    require(_value <= creditToHako[msg.sender], "Value is over your credit!");
    require(_value <= debtToHako[msg.sender], "Value is over your debt!");
    _membersCreditToHakoHakosDebtToMember(0, msg.sender, _value);
    _membersDebtToHakoHakosCreditToMember(0, msg.sender, _value);
    emit Arrangement(msg.sender, _value);
    return true;
  }

}



  

