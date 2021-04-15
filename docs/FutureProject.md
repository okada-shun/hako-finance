# About the future project

I have some points to think and improve in the future project. Listed below.

1. Incentives to member's credit lending  
For now, hako member can lend credit to the other member. However he can't get any incentives from doing that. So, it's necessary to think about incentives to member's credit lending. For example, whether or not to adopt something like interest? But, this system is made with the intention that "Lending Without Interest" and it is possible!

2. Restrictions in credit creation  
Hako members can do credit creation. However, without any restrictions, they can do it endlessly. If so, hako's credit and debt can increase endlessly and members' credit and debt can increase endlessly too. That makes a trouble named "Hyper Inflation". To avoid that, some restrictions are necessary in credit creation.

About 2. point, I give an example.

Example:

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

In the table 1, there is only 100 token. However, in the table 9, there is 800 token and there is 700 debt ( = members' debt to Hako). Like this, by repeating credit creation and transfer credit, so much credit can be generated.  
Well then, if they are repeated time and time again, what will happen? The answer is as follows.

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
Like this, without any restrictions, credit and debt can be generated endlessly. If Bob, Carol, Dave, Eric,... they are willing to return their debt to Hako, there is a demand for 16777216 token..., but if Bob, Carol, Dave, Eric,... they are a SAME PERSON, what will happen? Probably he throws away the account that has so much debt to Hako. If that happens, demand for generated token disappears and price of token crashes! This is a trouble named "Hyper Inflation". To avoid this calamity, some restrictions are necessary in credit creation. For example, setting the upper limit of the value of creatable credit can be considered.

If setting the upper limit as 10000, it comes to as follows.

|      Y     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 12700                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Harry   | 0              | 0                          | 6400                          | -                            | -                          | 
| Isaac   | 0              | 12800                          | 0                          | -                            | -                          | 

Isaac can create only 10000 credit.

|      Z     | Balance of Token | Member's credit to Hako | Member's debt to Hako | Hako's credit to Member | Hako's debt to Member | 
| :-------: | :--------------: | :--------------------------: | :------------------------: | :--------------------------: | :------------------------: | 
| Hako | 0             | -                            | -                          | 22700                            | 0                       | 
| Bob   | 0              | 0                          | 100                          | -                            | -                          | 
| Carol   | 0             | 0                            | 200                       | -                            | -                          | 
| Dave   | 0              | 0                          | 400                          | -                            | -                          | 
| Eric   | 0              | 0                          | 800                          | -                            | -                          | 
| ...   | ...             | ...                         | ...                          | ...                            | ...                          | 
| Harry   | 0              | 0                          | 6400                          | -                            | -                          | 
| Isaac   | 0              | 22800                          | 10000                          | -                            | -                          | 

Isaac can't create more than 10000 credit. So, inflation of token ends up in this point.

(...However, how do I decide the upper limit? I have no good idea!)