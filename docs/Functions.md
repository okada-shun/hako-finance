# Functions of Hako Finance

`"A's credit to B" = "B's debt to A"`  ---  formula (1)  

Member's credit to Hako = Hako's debt to Member  
If Member's credit to Hako increases, Hako's debt to Member increases.  
If Member's credit to Hako decreases, Hako's debt to Member decreases.  

Member's debt to Hako = Hako's credit to Member  
If Member's debt to Hako increases, Hako's credit to Member increases.  
If Member's debt to Hako decreases, Hako's credit to Member decreases.  

Creditor Member's credit to Debtor Member = Debtor Member's debt to Creditor Member  
If Creditor Member's credit to Member increases, Debtor Member's debt to Member increases.  
If Creditor Member's credit to Member decreases, Debtor Member's debt to Member decreases.  

## transfer

 = One account transfers his token to other account.

## joinHako

 = New member joins Hako by depositing some of his token to Hako.

New member gets credit instead of losing his token.  
Hako gets token instead of owing debt to new member.  
So, Member's credit to Hako increases and Hako's debt to Member increases too.  
Equivalent to that new member translates his token into credit.  

## leaveHako

 = Member leaves Hako.

Credit to Hako of leaving member becomes to 0.  
All token that he deposits to hako is returned to him.  
So, Member's credit to Hako decreases and Hako's debt to Member decreases too.  
If the member owes debt to hako or he is borrowing credit from other member, he can't leave.  
If the member is lending his credit to other member, he can't leave.  

If hako doesn't have enough token, it can't return all his token. So, in this case, it must increase token. Then, token total supply increases. This occurs in the case that one or some members owe debt to hako, the amount of credit owned by all members exceeds the amount of token owned by hako.  

## depositToken

 = Member deposits his token to Hako.

The member gets credit instead of losing his token.  
Hako gets token instead of owing debt to the member.  
So, Member's credit to Hako increases and Hako's debt to Member increases too.  
Equivalent to that the member translates his token into credit.  

## withdrawToken

 = Member withdraws token from Hako.

The member gets token instead of losing his credit.  
Hako loses its token instead of reducing its debt to Member.  
So, Member's credit to Hako decreases and Hako's debt to Member decreases too.  
Equivalent to that the member translates his credit into token.  
This is the opposite operation of deposit-token.  
If the member owes debt to hako or he is borrowing credit from other member, he can't withdraw token.  

If hako doesn't have enough token, he can't withdraw all his token. So, in this case, it must increase token. Then, token total supply increases. This occurs in the case that one or some members owe debt to hako, the amount of credit owned by all members exceeds the amount of token owned by hako.  

## transferCredit

 = Member transfers his credit( to Hako) to other member.

Transferer member can't transfer credit to non-member account.  
Transferer member can't transfer credit to the member who has debt to Hako.  

## registerBorrowing

 = Member registers the amount of credit( to Hako) that he wants to borrow and the duration of lending that he wants to borrow.

Member can't register more value than the upper limit.  
Member can't register more value than his net assets( = token + credit - debt).  
If the member is borrowing credit from other member, he can't register borrow value and borrow duration.  

## lendCredit

 = Member lends credit( to Hako) to other member for a certain duration.

Lender member can lend his credit to borrower member under the borrow value that the borrower registered.  
Lender member can lend his credit to borrower member over the borrow duration that the borrower registered.  
If the borrower member owes debt to hako, the creditor can't lend his credit to him.  

## collectDebtFrom

 = Creditor member collects debt from debtor member.

The creditor can't collect debt if the duration is yet to be passed.  
In the case that the debtor has enough credit, returns those, then returns to the situation before lending.  
In the case that the debtor has not enough credit, in place of him, hako pays back to creditor to make up for. Then, the debtor owes debt to hako, so his debt to Hako increases and hako's credit to Member increases too.  

## returnDebtTo

 = Debtor member returns his debt to creditor member.

The debtor can return his debt even if the duration is yet to be passed.  

## createCredit

 = Member creates credit.

Member's credit to Hako increases and Hako's debt increases too.  
Member's debt to Hako increases and Hako's credit increases too.  
Member can't create more credit than the upper limit.  
Member can't create more credit than his net assets( = token + credit - debt).  
If the member owes debt to hako, he can't create credit.  

## reduceDebt

 = Member who has debt to Hako reduces his debt by reducing his credit.

Member's credit to Hako decreases and Hako's debt decreases too.  
Member's debt to Hako decreases and Hako's credit decreases too.  
This is the opposite operation of credit-creation.  

Prev...  
→ [Main features of Hako Finance](https://github.com/okada-shun/hako-finance/blob/master/docs/MainFeatures.md)  
Next...  
→ [Theory of Hako Finance](https://github.com/okada-shun/hako-finance/blob/master/docs/Theory.md)