# WebApps Group Project

The following are examples on how to use the REST api:

+ All requests begin with /myStocks-2.0.3.RELEASE/myStocks/

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
    "valid": "true"
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

- get stock data
```
Request: GET /stocks/{tickerSymbol} EXAMPLE: /stocks/aapl
Request body: (empty)
[
    "172.8000",
    "165.7200",
    "165.2400",
    "162.9400",
    "163.6500",
    "164.2200",
    "162.3200",
    "165.2600",
    "169.1000",
    ..... (until 150 elements)
]
Response body:

```
