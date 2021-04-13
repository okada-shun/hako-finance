# Functions of Hako System

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

## joinHako

 = New member joins the Hako.  

Equivalent to that new member transforms his token into credit to Hako.  
Hako gets token instead of owing debt to new member.  
New member gets credit instead of losing his token.  
So, Member's credit to Hako increases and Hako's debt to Member increases too.  

## leaveHako

 = Member leaves the Hako.

Leaving member must pay back all his debt to members and to hako.  
credit to Hako of leaving member becomes to 0.  
All token that he deposits to hako is returned to him.  
So, Member's credit to Hako decreases and Hako's debt to Member decreases too.  
If the hako doesn't have enough token, it can't return all his token. So, in this case, it must increase token and token total supply increases. This occurs in the case that one or some members owe debt to hako, the amount of credit to Hako owned by all members is more than the amount of token owned by hako.  

## depositToken

 = Member deposits his token to the Hako.  

The member gets credit instead of losing his token.  
Hako gets token instead of owing debt to the member.  
So, Member's credit to Hako increases and Hako's debt to Member increases too.  

## withdrawToken

 = Member withdraws token from the Hako.

The member gets token instead of losing his credit to Hako.  
Hako loses its token instead of reducing its debt to Member.  
So, Member's credit to Hako decreases and Hako's debt to Member decreases too.  
This is the opposite operation of deposit token.  

If the member owes debt to hako or to other member, he can't withdraw token.  
If the hako doesn't have enough token, he can't withdraw all his token. So, in this case, it must increase token. Then, token total supply increases. This occurs in the case that one or some members owe debt to hako, the amount of credit to Hako owned by all members is more than the amount of token owned by hako.  

## transferCredit

 = Member transfers his credit( to Hako) to other member.  
 
Transferer member can't transfer credit to non member account.  
Transferer member can't transfer credit to the member who has debt to Hako.  

## registerBorrowValue

 = Member registers the amount of credit( to Hako) that he wants to borrow.  

Member can't register more value than his net assets(= token + credit - debt).  
The member who has debt to Member can't register borrow value.  

## lendCredit

 = Member lends credit( to Hako) to other member for a certain duration.  

Borrower member can borrow within the borrow value that he registers.  
Before lending, borrower member's debt to Hako must be zero because there is a risk that debtor member's debt to Hako swells up too high.  

## collectDebtFrom

 = Creditor member collects debt from debtor member.  

Creditor can't collect debt if the duration is yet to be passed.  
In the case that debtor has enough credit to Hako, returns those, then returns to the situation before lending.  
In the case that debtor has not enough credit to Hako, in place of him, the hako pays back to creditor to make up for. Then, the debtor owes debt to hako, so his debt to Hako increases and hako's credit to Member increases too.  

## returnDebtTo

 = Debtor member returns his debt to creditor member.  

## creditCreationByMember

 = Member creates credit to Hako(debt to Hako).  

Member's credit to Hako increases and Hako's debt increases too.  
Member's debt to Hako increases and Hako's credit increases too.  
The member who has debt to Hako can't create credit.  
Member can't create more credit than his net assets(= token + credit - debt).    
If member creates too much credit(and debt), there is a possibility that it falls into hyper inflation. Not to do so, some restrictions are necessary.  

## arrangement

 = Member who has debt to Hako reduces his debt to Hako by reducing his credit to Hako.  

Member's credit to Hako decreases and Hako's debt decreases too.  
Member's debt to Hako decreases and Hako's credit decreases too.  
This arrangement is the opposite operation of credit creation.  


