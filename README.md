# Individual Programming Project #2

* NOTE: I used my own implemented API for this project
* NOTE: You can find my submission folder in /kylePayneSubmission
* NOTE: The built war file in the submission folder has the dburl, password, and username in all of my DAO's as stated in the announcements. My actual project might still have my the old dburl, password, and username in all of my DAO's as I am running more tests after submission. If you need need to remake the war, you might need to adjust those values in my 4 DAO files.
* NOTE: index.html is the homepage

The following are examples on how to use the REST api:

- lookup user
```
Request: GET /customers/{username}
Request params: (empty)
Response body:
{
    "fname": "Jane",
    "lname": "Doe",
    "username": "jdoe",
    "email": "jdoe@gmail.com"
}
```
- create user 
```
Request: POST /customers
Request body:
{
    "fname": "Jane",
    "lname": "Doe",
    "username": "jdoe",
    "email": "jdoe@gmail.com"
}
Response body: (empty)
```

- update user
```
Request: PUT /customers
Request body:
{
    "fname": "John",
    "lname": "Dove",
    "username": "jdoe",
    "email": "jdove@gmail.com"
}
Response body: (empty)
```

- delete user
```
Request: DELETE /customers/{username}
Request params: (empty)
Response body: (empty)
```

- list all items
```
Request: GET /items
Request params: (empty)
Response body:
[
{
       "itemId": 107,
        "name": "Rose Cottage Girls' Hunter Green  Jacket Dress",
        "msrp": 20.0,
        "salePrice": 11.6,
        "upc": "048238056017",
        "shortDescription": "Paired with its' trendy jacket or worn alone, this dress will go anywhere in style.",
        "brandName": "Generic",
        "size": "16",
        "color": "Red",
        "gender": "Male"
},
{
       "itemId": 109,
        "name": "Blue Sweater",
        "msrp": 20.0,
        "salePrice": 11.6,
        "upc": "048238056019",
        "shortDescription": "Trendy sweater.",
        "brandName": "Generic",
        "size": "08",
        "color": "Blue",
        "gender": "Female"
}
]
```

- list items by keyword
```
Request: GET /items/search/{keyword}
Request params: (empty)
Response body:
[
{
       "itemId": 107,
        "name": "Rose Cottage Girls' Hunter Green  Jacket Dress",
        "msrp": 20.0,
        "salePrice": 11.6,
        "upc": "048238056017",
        "shortDescription": "Paired with its' trendy jacket or worn alone, this dress will go anywhere in style.",
        "brandName": "Generic",
        "size": "16",
        "color": "Red",
        "gender": "Male"
},
{
       "itemId": 109,
        "name": "Blue Sweater",
        "msrp": 20.0,
        "salePrice": 11.6,
        "upc": "048238056019",
        "shortDescription": "Trendy sweater.",
        "brandName": "Generic",
        "size": "08",
        "color": "Blue",
        "gender": "Female"
}
]
```

- list item by id
```
Request: GET /items/{id}
Request params: (empty)
Response body:
{
       "itemId": 107,
        "name": "Rose Cottage Girls' Hunter Green  Jacket Dress",
        "msrp": 20.0,
        "salePrice": 11.6,
        "upc": "048238056017",
        "shortDescription": "Paired with its' trendy jacket or worn alone, this dress will go anywhere in style.",
        "brandName": "Generic",
        "size": "16",
        "color": "Red",
        "gender": "Male"
}
```

- add item to shoping cart (Hint: If no current cart exists for this user, create a cart first).
```
Request: POST /carts
Request body:
{
    "productId": 1,
    "username": "jdoe"
}
Response body: (empty)
```

- show user's shopping cart
```
Request: GET /carts/{username}
Request params: (empty)
Response body:
[
{
   "cartId": 2,
   "items":[
     {
      "productId":1,
      "productName": "Blue sweater",
      "msrp": 20.99,
      "salePrice": 15.99
     },
     {
      "productId":8,
      "productName": "Red sweater",
      "msrp": 20.99,
      "salePrice": 15.99
     }
   ]
}
]
```

- remove item from shopping cart
```
Request: DELETE /carts
Request body:
{
   "cartId": 2,
   "productId":1
}
Response body: (empty)
```

- buy item (adjust shopping cart status and product list/count)
```
Request: PUT /carts/purchase/{cartId}
Request params: (empty)
Response body: (empty)
```


- list users who bought a specific product
    EXAMPLE: /carts?productId=1
```
Request: GET /carts
Query params:
{
  "productID":1
}
Response body:
[
    {
        "fname": "Jane",
        "lname": "Doe",
        "username": "jdoe",
        "email": "jdoe@gmail.com"
    }
]
```

- list products bought by specific user
```
Request: GET /carts/purchased/{username}
Query params: none
Response body:
[
   ...
]
```

