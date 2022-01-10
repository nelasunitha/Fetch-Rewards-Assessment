
# Fetch-Rewards-Assessment

**About**

This project is to provide API routes to 
1) Add transaction route.
2) Route to spend points.
3) Route to return balance.  



**Requirements**

. Javascript

. Node.js and Express.js

. Postgres Database

**GitHub** 

Fork this repo to your own Github account. Then git clone your forked repo to your local machine by typing git clone in Terminal/ Command Prompt. cd into the folder

https://github.com/nelasunitha/Fetch-Rewards-Assessment/

**Installing dependencies**

npm install

**How to Seed**

For convenience seeded some dummy data for the details mentioned in assessment

npm run seed

**How to Start**

npm start or node index.js

**RESTful API's**

Adding Transaction -  POST Request  - URL  http://localhost:3000/api/users 

Response POST /api/users  ----- 201 
```{
    "id": 6,
    "payer": "dannon",
    "points": 1000,
    "timestamp": "2020-11-02T14:00:00.000Z",
}
```
Spend Points -  PUT Request - URL  http://localhost:3000/api/users/spend/:5000 

Response PUT /api/users/spend/:5000 200 
``` json 
[
    {
        "payer": "dannon",
        "points": -100
    },
    {
        "payer": "uniliver",
        "points": -200
    },
    {
        "payer": "miller",
        "points": -4700
    }
]
```
Balance after subsequent call for spend - GET request -  URL  http://localhost:3000/api/users/balance 
Response GET /api/users/balance 200 

``` json 
{
    "dannon": 1000,
    "uniliver": 0,
    "miller": 5300
}
```
Used Postman API platform for building and using API's.

Can download at https://www.postman.com/downloads/
