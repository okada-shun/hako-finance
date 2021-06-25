# Hako owner

I have one point to think in this project. It is "restrictions in credit creation".  
Hako members can do credit creation. However, without any restrictions, they can do it endlessly. If so, hako's credit and debt can increase endlessly and members' credit and debt can increase endlessly too. That makes a trouble named "Hyper Inflation". To avoid that, some restrictions are necessary in credit creation.

About this point, I give an example.

Example1:

Bob has 100 token.

|      1     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 0             | -                            | -                          | 0                            | 0                       | 
| Bob   | 100              | 0                          | 0                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he deposits 100 token to Hako, it comes to as follows.

|      2     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 100             | -                            | -                          | 0                            | 100                       | 
| Bob   | 0              | 100                          | 0                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he creates 100 credit, it comes to as follows.

|      3     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 100                            | 200                       | 
| Bob   | 0              | 200                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he transfers 200 credit to Carol, it comes to as follows.

|      4     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 100                            | 200                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 200                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if Carol creates 200 credit, it comes to as follows.

|      5     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 300                            | 400                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 400                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if she transfers 400 credit to Dave, it comes to as follows.

|      6     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 300                            | 400                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 400                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if Dave creates 400 credit, it comes to as follows.

|      7     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 700                            | 800                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 800                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he transfers 800 credit to Eric, it comes to as follows.

|      8     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 700                            | 800                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 800                          | 0                          | -                            | -                          | 

And then, if Eric withdraws 800 credit from Hako, it comes to as follows.

|      9     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 700                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 800              | 0                          | 0                          | -                            | -                          | 

In the table1, there is only 100 token. However, in the table9, there is 800 token and there is 700 debt ( = members' debt to Hako). Like this, by repeating credit creation and transfer credit, so much credit can be generated.  
Well then, if these are repeated time and time again, what will happen? The answer is as follows.

|      X     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 16777116                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Zach   | 16777216              | 0                          | 0                          | -                            | -                          | 

As above, Zach has 16777216 token! This value is so high!  
Like this, without any restrictions, credit and debt can be generated endlessly. If Bob, Carol, Dave, Eric,... they are willing to return their debt to Hako, there is a demand for 16777216 token..., but if Bob, Carol, Dave, Eric,... they are a SAME PERSON, what will happen? Probably "he" throws away the account that has so much debt to Hako. If that happens,the  demand for generated token disappears and the price of token crashes! This is a trouble named "Hyper Inflation". To avoid this calamity, some restrictions are necessary in credit creation. For example, setting the upper limit of the value of creatable credit can be considered.

If setting the upper limit as 10000, it comes to as follows.

|      X'     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 12700                            | 12800                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Harry   | 0              | 0                          | 6400                          | -                            | -                          | 
| Isaac   | 0              | 12800                          | 0                          | -                            | -                          | 
| John   | 0              | 0                          | 0                          | -                            | -                          | 

Isaac can create only 10000 credit.

|      Y     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 22700                            | 22800                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Harry   | 0              | 0                          | 6400                          | -                            | -                          | 
| Isaac   | 0              | 22800                          | 10000                          | -                            | -                          | 
| John   | 0              | 0                          | 0                          | -                            | -                          | 

And then, If Isaac transfers 22800 credit to John and John withdraws 22800 credit from Hako, it comes to as follows.

|      Z     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 22700                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Harry   | 0              | 0                          | 6400                          | -                            | -                          | 
| Isaac   | 0              | 0                          | 10000                          | -                            | -                          | 
| John   | 22800              | 0                          | 0                          | -                            | -                          | 

Isaac can't create more than 10000 credit. So, inflation of token ends up in this point.

However, who decide the upper limit?  
Then I decided to set up a role as "hako owner" in this system. This hako owner can set the upper limit but can't join Hako unlike the other accounts.

About hako owner, I give an example.

Example2:

Alice is a hako owner and she has 100 token. Bob, Carol, Dave, Eric, and Flora are members.

|      1     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 0                            | 0                       | 
| Alice(owner) | 100              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 0                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

Hako owner can't join Hako. So, Alice can't join Hako.  
She can decide the upper limit of credit creation and suppose that she sets it as 300.

Alice transfers 100 token to Bob.

|      2     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 0             | -                            | -                          | 0                            | 0                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 100              | 0                          | 0                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if Bob deposits 100 token to Hako, it comes to as follows.

|      3     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: |
| Hako | 100             | -                            | -                          | 0                            | 100                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 100                          | 0                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he creates 100 credit, it comes to as follows.

|      4     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 100                            | 200                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 200                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he transfers 200 credit to Carol, it comes to as follows.

|      5     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 100                            | 200                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 200                            | 0                        | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if Carol creates 200 credit, it comes to as follows.

|      6     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 300                            | 400                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 400                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if she transfers 400 credit to Dave, it comes to as follows.

|      7     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 300                            | 400                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 400                          | 0                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, Dave tries to create 400 credit, however he can't do it because the upper limit is 300. Even though Dave's net assets is 400, he can create only 300 credit.

|      8     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 600                            | 700                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 700                          | 300                          | -                            | -                          | 
| Eric   | 0              | 0                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he transfers 700 credit to Eric, it comes to as follows.

|      9     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 600                            | 700                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 700                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

Eric's net assets is 700, however, like Dave, he can create only 300 credit.

|      10     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 900                            | 1000                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 1000                          | 300                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, If Eric transfers 1000 credit to Flora and Flora withdraws 1000 credit from Hako, it comes to as follows.

|      11     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 900                            | 0                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 0                          | 300                          | -                            | -                          | 
| Flora   | 1000              | 0                          | 0                          | -                            | -                          | 

Suppose that Alice changes the upper limit from 300 to 500, Eric becomes able to create more credit.

Starting from the table10, Eric reduces his 300 debt by reducing his 300 credit.

|      12     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 600                            | 700                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 700                          | 0                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, if he creates 500 credit, it comes to as follows.

|      13     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 100             | -                            | -                          | 1100                            | 1200                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 1200                          | 500                          | -                            | -                          | 
| Flora   | 0              | 0                          | 0                          | -                            | -                          | 

And then, If Eric transfers 1200 credit to Flora and Flora withdraws 1200 credit from Hako, it comes to as follows.

|      14     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 1100                            | 0                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 0                          | 500                          | -                            | -                          | 
| Flora   | 1200              | 0                          | 0                          | -                            | -                          | 

Compared table11 with table14, the amount of token in table14 is larger than that in table11.  
If hako owner increases the upper limit, the amount of token increases too. Conversely, if hako owner decreases the upper limit, the amount of token decreases too. In other words, hako owner can control the amount of token supply by changing the upper limit.

This upper limit is used in credit lending between members. In credit lending, the member who can't return his debt will owe debt to Hako. So, to avoid that the member owes so much debt, the borrower member can't register more value than the upper limit.

By the way, how can Alice make a profit by playing a role as hako owner?

About hako owner's reward, I give an example.

Example3:

Alice is a hako owner. Bob, Carol, Dave, Eric, and Flora are members.  
Starting from the table14, if Flora deposits 1200 token to Hako, it comes to as follows.

|      1     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 1200             | -                            | -                          | 1100                            | 1200                       | 
| Alice(owner) | 0              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 0                          | 500                          | -                            | -                          | 
| Flora   | 0              | 1200                          | 0                          | -                            | -                          | 

Hako owner can get 1% token owned by Hako as reward, so Alice can get 1200/100 (= 12) token. This reward is paid every 24 hours.

|      2     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 1188             | -                            | -                          | 1100                            | 1200                       | 
| Alice(owner) | 12              | -                          | -                          | -                            | -                          | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 300                          | -                            | -                          | 
| Eric   | 0              | 0                          | 500                          | -                            | -                          | 
| Flora   | 0              | 1200                          | 0                          | -                            | -                          | 

By this, total "Member's credit to Hako" (= "Hako's debt to Member") becomes larger than "Balance of Token" owned by Hako (1200 > 1188). So, if Flora withdraws all her token from Hako, the amount of token increases by 12.

Of course, this can lead to the inflation of token. So, it's necessary to think about this owner's reward.

Prev...  
→ [Theory of Hako Finance](https://github.com/okada-shun/hako-finance/blob/master/docs/Theory.md)  
Next...  
→ [About the future project](https://github.com/okada-shun/hako-finance/blob/master/docs/FutureProject.md)