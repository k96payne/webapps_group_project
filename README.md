# WebApps Group Project

*TODO: Adjust API documnetation

The following are examples on how to use the REST api:

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
Request: DELETE /users
Request body:
{
    "username": "kpayne",
    "tickerSymbol": "APPL"
}
Response body: (empty)
```
