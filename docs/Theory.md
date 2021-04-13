# Theory of Hako System

Hako System has two components, Hako and Member.

Hako is a smart contract, and has one's own contract address.  
Member is the address to join Hako. They join Hako, deposit their hako-token to Hako. At this time, Hako gives IOU to the members as a replacement for deposited token. This IOU's name is "credit to Hako". By using this credit, members can do some transactions with the other members.

I have to explain the theory of this system in more detail.

Example:

Suppose that there is 100 token in the world and Bob has 100 token.

|      1     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 0             | 0                            | 0                          | 0                            | 0                       | 
| Bob   | 100              | 0                          | 0                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 0                        | 0                            | 0                          | 
| Dave   | 0              | 0                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if he deposits 100 token to Hako, it comes to as follows.

|      2     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 100             | 0                            | 0                          | 0                            | 100                       | 
| Bob   | 0              | 100                          | 0                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 0                        | 0                            | 0                          | 
| Dave   | 0              | 0                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if he creates 100 credit, it comes to as follows.

|      3     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 100                            | 200                       | 
| Bob   | 0              | 200                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 0                        | 0                            | 0                          | 
| Dave   | 0              | 0                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if he transfers 200 credit to Carol, it comes to as follows.

|      4     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 100                            | 200                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 200                            | 0                        | 0                            | 0                          | 
| Dave   | 0              | 0                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if Carol creates 200 credit, it comes to as follows.

|      5     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 300                            | 400                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 400                            | 200                       | 0                            | 0                          | 
| Dave   | 0              | 0                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if she transfers 400 credit to Dave, it comes to as follows.

|      6     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 300                            | 400                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 200                       | 0                            | 0                          | 
| Dave   | 0              | 400                          | 0                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if Dave creates 400 credit, it comes to as follows.

|      7     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 700                            | 800                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 200                       | 0                            | 0                          | 
| Dave   | 0              | 800                          | 400                          | 0                            | 0                          | 
| Eric   | 0              | 0                          | 0                          | 0                            | 0                          | 

And then, if he transfers 800 credit to Eric, it comes to as follows.

|      8     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | 0                            | 0                          | 700                            | 800                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 200                       | 0                            | 0                          | 
| Dave   | 0              | 0                          | 400                          | 0                            | 0                          | 
| Eric   | 0              | 800                          | 0                          | 0                            | 0                          | 

And then, if Eric withdraws 800 credit from Hako, it comes to as follows.

|      9     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | 0                            | 0                          | 700                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | 0                            | 0                          | 
| Carol   | 0             | 0                            | 200                       | 0                            | 0                          | 
| Dave   | 0              | 0                          | 400                          | 0                            | 0                          | 
| Eric   | 800              | 0                          | 0                          | 0                            | 0                          | 

In the table 1, there is only 100 token. However, in the table 9, there is 800 token. Like this, by repeating credit creation and transfer credit, so much token can be generated.  
Wait, from table 1 to table 9, the amount of token increased 8 times. Some of you may expect that the price of token falls in 1/8 because the supply of token increases 8 times.  
However, at the same time, the demand for token also increases 8 times!  
What's the meaning of this?  
In the table 9, Bob has 100 debt, Carol has 200 debt, and Dave has 400 debt. Because of these debt, they can't withdraw their token from Hako, can't borrow credit from the other member, can't create credit, and can't be transferred credit. These restrictions are set in the smart contract. To do these transactions again, the three of them have to get token, deposit it to Hako, and reduce all of their debt. So, Bob needs 100 token, Carol needs 200 token, and Dave needs 400 token. In total, there is 700 demand for token.

Token Demand = +700  
Token Supply = +700  
∴ ΔToken Demand = ΔToken Supply

From the above formula, the born demand is equal to the born supply. Therefore, it is expected that the price of token is stable. In other words, the price of token is supported by the members' debt to Hako.

All things considered, it comes to as follows.

Q: Why credit is valuable?  
A: Because you can translate credit into token.

Q: Then, why token is valuable?  
A: Because there are some accounts that have debt to Hako. By getting token, they can return their debt to Hako and they can do some transactions again. Those demand for token supports the value of token.