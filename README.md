# WebApps Group Project

Setting up your local environment:
* Create a mysql DB named mystocks
* Make sure your credentials match the ones in ADao.java
* Run the create DB tables script
* Run the populae DB tables script
* The admin username and password is: admin adminpassword

The following are examples on how to use the REST api:

*NOTE: All requests begin with /myStocks-2.0.3.RELEASE/myStocks/

- lookup user
```
Request: GET /users/{username}
Request params: (empty)
Response body:
{
    "password": "password",
    "fname": "kyle",
    "lname": "payne",
    "username": "kpayne",
    "email": "emailAddress@gmail.com"
}
```
- create user 
```
Request: POST /users
Request body:
{
	"fname": "kyle",
	"lname": "payne",
    "username": "kpayne",
    "password": "password",
    "email": "emailAddress@gmail.com"
}
Response body: (empty)
```

- update user
```
Request: PUT /users
Request body:
{
	"fname": "kyleNew",
	"lname": "payneNew",
    	"username": "kpayne",
    	"email": "newEmailAddress@gmail.com"
}
Response body: (empty)
```

- delete user
```
Request: DELETE /users/{username}
Request params: (empty)
Response body: (empty)
```

- validate user
```
Request: GET /users?username=kpayne&password=password
Request body: (empty)
Response body: 
{
    "valid": "true",
    "userExists": "true",
    "isAdmin": "false"
}
```

- lookup user's favorite stocks
```
Request: GET /favorite/{username}
Request params: (empty)
Response body:
[
    "APPL"
]
```

- add to favorite stocks 
```
Request: POST /favorite
Request body:
{
    "username": "kpayne",
    "tickerSymbol": "APPL"
}
Response body: (empty)
```

- remove from favorite stocks
```
Request: DELETE /favorite
Request body:
{
    "username": "kpayne",
    "tickerSymbol": "APPL"
}
Response body: (empty)
```

- promote user
```
Request: PUT /users/promote/{username}
Request body: (empty)
Response body: (empty)
```

- get stock data (returns the last 150 closing values by day recorded for stocks) 
```
Request: GET /stocks/queryargs EXAMPLE: stocks?tickerSymbol=TSLA&tickerSymbol=AAPL&datasetSize=50
Request body: (empty)
Response body:
{
    "AAPL": [
        "176.9110",
        "185.8600",
        "193.5300",
        "191.4100",
        "186.8000",
        "192.2300",
        "194.1700",
        "204.4700",
        "208.4900",
        "209.9500",
	... 
     ],
     "TSLA": [
        "344.1298",
        "353.4700",
        "354.3100",
        "348.4400",
        "344.0000",
        "338.7300",
        "331.2800",
        "350.5100",
        "351.4000",
        "348.1600",
	...
     ]
}

```
