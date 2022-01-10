# Fetch-Rewards-Assessment

**About**

This project is to provide API routes to 
1) Add transaction route.
2) Route to spend points.
3) Route to return balance.  

**Requirements**
Javascript
Node.js
Postgres Database

**Installing******

**npm install**

**Seeding data******

For convinence seeded some dummy data for the details mentioned in assessment

**npm run seed**

**Start**

**npm start or node index.js**

**RESTful API's**

Adding Transaction -  POST Request  - URL  http://localhost:3000/api/users 

Response POST /api/users 201 
``` json {
    "id": 7,
    "payer": "Mike",
    "points": 1000,
    "timestamp": "2020-11-02T14:00:00.000Z",
    "updatedAt": "2022-01-10T02:39:01.804Z",
    "createdAt": "2022-01-10T02:39:01.804Z"
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
