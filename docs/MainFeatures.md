# Main features of Hako Finance

## Abstract

Hako Finance system has two components, Hako and Member.

Hako is a smart contract, comes from japanese word "ハコ". This means "box" in English. Hako has one's own contract address.  
Member is the address to join Hako. They join Hako, deposit their hako-token to Hako.  

Hako gives IOU to the members as a replacement for deposited token. This IOU's name is "credit to Hako". This means "Member's credit to Hako". On the other hand, this means "Hako's debt to Member". In other words, the following equation holds up.

"Member's credit to Hako" = "Hako's debt to Member"

Generalizing this, the following equation holds up any time.

`"A's credit to B" = "B's debt to A"`  ---  formula (1)

Can't understand?  
I give you some examples. In the following passage, I write "Member's credit to Hako" as "credit" and "Hako Token" as "token". In examples, I write 3 members' names as "Bob", "Carol", "Dave". ("Alice" is absence this time. She is given a special role!)

Example1:

Bob has 1000 token.

|     1      | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0                | -                            | -                          | 0                            | 0                          | 
| Bob   | 1000             | 0                            | 0                          | -                            | -                          | 

If Bob deposits 300 token to Hako, it comes to as follows.

|      2     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 300              | -                            | -                          | 0                            | 300                        | 
| Bob   | 700              | 300                          | 0                          | -                            | -                          | 

As above, Bob gets 300 credit instead of depositing 300 token and Hako gets 300 token instead of owing 300 debt to Bob. From formula (1), Bob's credit to Hako is equal to Hako's debt to Bob. So, Hako's debt to Member increases by 300.

Also, Bob can withdraw within 300 token from Hako. If he withdraws 300 token, table2 situation returns to table1 situation.

Example2: Starting from table2 situation.

If more members join Hako, deposit more token and get more credit, Hako gets more token and owes more debt to members. In other words, the members lose their token insted of getting credit, on the other hand, Hako gets token instead of owing debt to the members.

Carol has 1500 token and Dave has 500 token.

|     3      | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 300              | -                            | -                          | 0                            | 300                        | 
| Bob   | 700              | 300                          | 0                          | -                            | -                          | 
| Carol   | 1500             | 0                            | 0                          | -                            | -                          | 
| Dave   | 500              | 0                            | 0                          | -                            | -                          | 

If Carol deposits 500 token and Dave deposits 200 token to Hako, it comes to as follows.

|     4      | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 1000             | -                            | -                          | 0                            | 1000                       | 
| Bob   | 700              | 300                          | 0                          | -                            | -                          | 
| Carol   | 1000             | 500                          | 0                          | -                            | -                          | 
| Dave   | 300              | 200                          | 0                          | -                            | -                          | 

As above, Carol gets 500 credit instead of depositing 500 token and Hako gets 500 token instead of owing 500 debt to Carol. Also, Dave gets 200 credit instead of depositing 200 token and Hako gets 200 token instead of owing 200 debt to Dave. As a result, Hako's debt to Member increases by 700 ( = 500 + 200).

It turns out that "Hako's debt to Member" is equal to the total "Member's credit to Hako". (1000 = 300 + 500 + 200 : From formula (1))

By the way, what is "credit to Hako"? Why members exchange their own token for them?  
"Hako Token" plays the role of "gold / assets" in this system and "credit to Hako" plays the role of "convertible note / currency" among the members. Members can transfer it to the other members and they can also lend it to the other members. About the exact functions, I tell you in the next.

## Main functions

Hako Finance system has some functions. Listed below.

1. transfer "credit to Hako"
2. lend "credit to Hako"
3. credit creation by member

### 1. transfer "credit to Hako"

This is the same function as "transfer" of ERC20. As its name suggests, transfer credit( to Hako) to the other member.

I give an example.

Example3: Starting from table4 situation.

If Bob transfers 100 credit to Carol, it comes to as follows.

|     5      | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 1000             | -                            | -                          | 0                            | 1000                       | 
| Bob   | 700              | 200                          | 0                          | -                            | -                          | 
| Carol   | 1000             | 600                          | 0                          | -                            | -                          | 
| Dave   | 300              | 200                          | 0                          | -                            | -                          | 

As above, Bob loses 100 credit and Carol gets 100 credit. Hako's debt to Member does not change. (1000 = 200 + 600 + 200)

### 2. lend "credit to Hako"

This is the function that one member lends some credit( to Hako) to the other member for a certain duration. 

Example4: Starting from table5 situation.

If Bob lends 100 credit to Carol for 10 days, it comes to as follows.

|      6     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 0                            | 1000                       | -                         | -                       | 
| Bob   | 700              | 100                          | 0                          | -                            | -                          | 100                       | 0                       | 
| Carol   | 1000             | 700                          | 0                          | -                            | -                          | 0                         | 100                     | 
| Dave   | 300              | 200                          | 0                          | -                            | -                          | 0                         | 0                       | 

As above, Bob loses 100 "credit to Hako" instead of getting 100 "credit to Other Member" and Carol gets 100 "credit to Hako" instead of owing 100 "debt to Other Member". From formula (1), Bob's credit to Carol is equal to Carol's debt to Bob.  
Carol gets 100 credit by borrowing, so her total credit is 700. However, she becomes unable to withdraw her token from Hako.  
Why?  
If she borrows 100 credit from the other member and she can withdraw 700 token from Hako, there is a possibility that she runs away without returning her debt to Bob! So, the member who has debt to Other Member can't withdraw token.

10 days later, if Bob wants Carol to return 100 credit, Bob can claim Carol to do so. After returning, it comes to as follows.

|     7     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 0                            | 1000                       | -                         | -                       | 
| Bob   | 700              | 200                          | 0                          | -                            | -                          | 0                         | 0                       | 
| Carol   | 1000             | 600                          | 0                          | -                            | -                          | 0                         | 0                       | 
| Dave   | 300              | 200                          | 0                          | -                            | -                          | 0                         | 0                       | 

This is the same as table5 situation. By returning, Bob's credit to Carol disappears and Carol's debt to Bob disappears too.

Example5: Starting from table6 situation.

Then, if Bob wants Carol to return 100 credit, however Carol has not enough credit, what will happen?

Suppose Carol transferred all of her 700 credit to Dave after borrowing, it comes to as follows.

|      8     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 0                            | 1000                       | -                         | -                       | 
| Bob   | 700              | 100                          | 0                          | -                            | -                          | 100                       | 0                       | 
| Carol   | 1000             | 0                            | 0                          | -                            | -                          | 0                         | 100                     | 
| Dave   | 300              | 900                          | 0                          | -                            | -                          | 0                         | 0                       | 

Then, if Bob claims Carol to return, what will happen? The answer is as follows.

|      9     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 100                            | 1100                       | -                         | -                       | 
| Bob   | 700              | 200                          | 0                          | -                            | -                          | 0                         | 0                       | 
| Carol   | 1000             | 0                            | 100                        | -                            | -                          | 0                         | 0                       | 
| Dave   | 300              | 900                          | 0                          | -                            | -                          | 0                         | 0                       | 

As above, Carol's debt to Bob is translated into Carol's debt to Hako. As a result, Hako's credit to Member increases (because Carol's debt to Hako = Hako's credit to Carol) and Hako's debt to Member increases (because Bob's credit to Hako = Hako's debt to Bob) too. Like from table6 to table7 situation, Bob's credit to Carol disappears and Carol's debt to Bob disappears too.

Compared Example4 with Example5, in the former situation, Hako's credit to Member and Hako's debt to Member dose not change. On the other hand, in the latter situation, Hako's credit to Member and Hako's debt to Member changes. Where does this difference come from?  
The difference between the two examples is whether or not Hako is involved with the lending and returning between the two members. In the Example4, the lending and returning is completed within the two. However in the Example5, it is not completed within the members because Hako returns credit to Bob in place of Carol.

By the way, Carol doesn't return her debt to Bob, is this no problem?  
Of course, PROBLEM!  
If the member has debt to Hako, he becomes unable to withdraw his token from Hako, unable to borrow credit from the other member, unable to create credit (about "create credit", I tell you in the next "3. credit creation by member"), and unable to be transferred credit. These are set in this smart contract as PENALTY.  
So, Carol becomes unable to withdraw her token from Hako, unable to borrow credit from the other member, unable to create credit, and unable to get credit from the other member. However, if she returns her all of debt to Hako and her debt to Hako becomes to 0, she becomes able to do them again. About how to return debt to Hako, I tell you in the next "3. credit creation by member, example7".

### 3. credit creation by member

This is the function that hako member creates credit. As a result of this, the member's credit to Hako increases and his debt to Hako increases too. On the side of hako, its credit to Member increases and its debt to Member increases too.

Why do all of them increase? I tell you by using an example.

Example6: Starting from table9 situation.

If Bob creates 300 credit, it comes to as follows.

|      10     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 400                            | 1400                       | -                         | -                       | 
| Bob   | 700              | 500                          | 300                          | -                            | -                          | 0                         | 0                       | 
| Carol   | 1000             | 0                            | 100                        | -                            | -                          | 0                         | 0                       | 
| Dave   | 300              | 900                          | 0                          | -                            | -                          | 0                         | 0                       | 

Bob can get 300 credit, so his credit adds up from 200 to 500. However, at the same time, he owes 300 debt to Hako, so his debt to Hako also increases and adds up to 300.  
On the side of hako, its credit to Member increases by 300 because Bob's debt to Hako increases. Similarly, its debt to Member increases by 300 because Bob's credit to Hako increases. (400 = 300 + 100 + 0, 1400 = 500 + 0 + 900 : From formula (1))  

By credit creation, member can get credit, but he becomes unable to withdraw his token from Hako, unable to borrow credit from the other member, unable to create credit, and unable to be transferred credit. These are set in this smart contract in return for credit creation. If he returns his all of debt to Hako and his debt to Hako becomes to 0, he becomes able to do them again. About how to return debt to Hako, I tell you in the example7.  

By credit creation, Hako can get credit to Member, but it can't use it for the sake of itself. Hako's credit and debt is just a number to show the amount of the members' total credit and debt to Hako.

Example7: Starting from table10 situation.

Member owing debt to hako can reduce his debt by reducing his credit.

If Bob reduces his debt by 100 by reducing his credit, it comes to as follows.

|      11     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | Member's credit to Other Member | Member's debt to Other Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | :-----------------------: | :---------------------: | 
| Hako | 1000             | -                            | -                          | 300                            | 1300                       | -                         | -                       | 
| Bob   | 700              | 400                          | 200                          | -                            | -                          | 0                         | 0                       | 
| Carol   | 1000             | 0                            | 100                        | -                            | -                          | 0                         | 0                       | 
| Dave   | 300              | 900                          | 0                          | -                            | -                          | 0                         | 0                       | 

Bob can reduce 100 debt, so his debt decreases from 300 to 200. However, at the same time, his credit decreases from 500 to 400 too.  
On the side of hako, its credit to Member decreases by 100 because Bob's debt to Hako decreases. Similarly, its debt to Member decreases by 100 because Bob's credit to Hako decreases. (300 = 200 + 100 + 0, 1300 = 400 + 0 + 900 : From formula (1))

This debt arrangement is the opposite of credit creation. Credit creation is the operation to increase member's credit and debt and increase hako's credit and debt. In contrast, this is the operation to decrease member's credit and debt and decrease hako's credit and debt.

As you can see from above 11 tables, total Member's credit to Hako is equal to Hako's debt to Member and total Member's debt to Hako is equal to Hako's credit to Member. These are derived from formula (1).

Prev...  
→ [README](https://github.com/okada-shun/hako-finance/blob/master/README.md)  
Next...  
→ [Functions of Hako Finance](https://github.com/okada-shun/hako-finance/blob/master/docs/Functions.md)