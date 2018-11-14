var itemSearch;

function goToDetailsView(name) {
	window.location.href = "productDetails.html?searchQuery=" + name;
}

function goToAccount() {
	window.location.href="account.html";
}

function goToCreateAccount() {
	window.location.href="createAccount.html";
}

function populateProductDetails(json) {
	if(json.name != null) {
		document.getElementById("product").value = json.itemId;
		document.getElementById("itemName").innerText = json.name;
		document.getElementById("msrp").innerText = json.msrp;
		document.getElementById("salePrice").innerText = json.salePrice;
		document.getElementById("description").innerText = json.shortDescription;
		document.getElementById("brandName").innerText = json.brandName;
		document.getElementById("size").innerText = json.size;
		document.getElementById("color").innerText = json.color;
		document.getElementById("gender").innerText = json.gender;
	} else {
		document.getElementById("product").value = -1;
		alert('Item Is Out of Stock')
	}
	
}

function generateProductDetails() {
	let params = (new URL(document.location)).searchParams;
	let searchQuery = params.get("searchQuery");
	makeCorsRequest('GET', 
			'http://localhost:8080/store-2.0.3.RELEASE/store/items/' 
			+ searchQuery, populateProductDetails, null);
}

function populateUserDetails(json) {
	if(json.username == null) {
		goToCreateAccount();
	} else {
		document.getElementById("firstName").innerText = json.fname;
		document.getElementById("lastName").innerText = json.lname;
		document.getElementById("username").innerText = json.username;
		document.getElementById("email").innerText = json.email;
		//document.getElementById("purchasedItems").innerText = "";
		makeCorsRequest('GET', 
				'http://localhost:8080/store-2.0.3.RELEASE/store/carts/purchased/' 
				+ getCookie('username'), populatePurchasedItems, null);
	}
}

function populatePurchasedItems(json) {
	document.getElementById("purchasedItems").innerText = json;
}

function addToCart() {
	if (usernameExists() == true) {
		var itemId = document.getElementById("product").value;
		if (itemId != -1) {
			var requestObject = {};
			requestObject.username = getCookie('username');
			requestObject.productId = itemId;
			makeCorsRequest('POST', 
					'http://localhost:8080/store-2.0.3.RELEASE/store/carts', 
					refresh, requestObject);
		} else {
			alert('Item Is Out of Stock');
		}
	} else {
		goToAccount();
	}
}

function generateAccountDetails() {
	var username;
	if (usernameExists() == true) {
		username = getCookie('username');
	} else {
		username = prompt("Enter Username", "username");
		setCookie('username', username, 30);
	}
	
	makeCorsRequest('GET', 'http://localhost:8080/store-2.0.3.RELEASE/store/customers/'
			+ username, populateUserDetails, null);
}

function createAccount() {
	var firstName = document.getElementById('fname').value;
	var lastName = document.getElementById('lname').value;
	var username = document.getElementById('uname').value;
	var email = document.getElementById('email').value;
	
	if(firstName == null || firstName == "" || lastName == null ||
			lastName == "" || username == null || username == "" ||
			email == null || email == "") {
		alert('Not all fields are filled');
	} else {
		var requestObject = {};
		requestObject.fname = firstName;
		requestObject.lname = lastName;
		requestObject.username = username;
		requestObject.email = email;
		setCookie('username', username, 30);
		makeCorsRequest('POST', 'http://localhost:8080/store-2.0.3.RELEASE/store/customers',
				goToAccount, requestObject);
	}
}

function updateAccount() {
	var firstName = document.getElementById('fname').value;
	var lastName = document.getElementById('lname').value;
	var email = document.getElementById('email').value;
	
	if(firstName == null || firstName == "" || lastName == null ||
			lastName == "" || email == null || email == "") {
		alert('Not all fields are filled');
	} else {
		var requestObject = {};
		requestObject.fname = firstName;
		requestObject.lname = lastName;
		requestObject.username = getCookie('username');
		requestObject.email = email;
		makeCorsRequest('PUT', 'http://localhost:8080/store-2.0.3.RELEASE/store/customers',
				goToAccount, requestObject);
	}
}

function populateCartItems(json) {
	document.getElementById("cart").value = json.cartId;
	var total = 0;
	var itemNumber = 0;
	json.items.forEach(function(item) {
		itemNumber++;
		var itemId = "cartItem" + itemNumber;
		document.getElementById(itemId).innerText = item.shortDescription + " $" + item.salePrice;
		document.getElementById(itemId).value = item.itemId;
		total = total + item.salePrice;
	});
	
	itemNumber++;
	
	for( ; itemNumber < 14; itemNumber++) {
		var itemId = "cartItemRemove" + itemNumber;
		document.getElementById(itemId).style.display = "none";
		var breakId = "cartBreak" + itemNumber;
		document.getElementById(breakId).style.display = "none";
	}
	
	document.getElementById("cartSubTotal").innerText = "SUBTOTAL: $" + Math.round(total*100) / 100;
	document.getElementById("cartTax").innerText = "TAX: $" + Math.round(total*0.08*100) / 100;
	document.getElementById("cartTotal").innerText = "TOTAL: $" + Math.round(total*1.08*100) / 100;
}

function generateCartItems() {
	if (usernameExists() == true) {
		var username = getCookie('username');
		makeCorsRequest('GET', 'http://localhost:8080/store-2.0.3.RELEASE/store/carts/'
			+ username, populateCartItems, null);
	} else {
		goToAccount();
	}
}

function removeCartItem(elementId) {
	var productId = document.getElementById(elementId).value;
	
	var requestObject = {};
	requestObject.cartId = document.getElementById("cart").value;
	requestObject.productId = productId;
	
	makeCorsRequest('DELETE', 'http://localhost:8080/store-2.0.3.RELEASE/store/carts'
			, refresh, requestObject);	
}

function purchaseCart() {
	var cartId = document.getElementById("cart").value;
	makeCorsRequest('PUT', 'http://localhost:8080/store-2.0.3.RELEASE/store/carts/purchase/'
			+ cartId, refresh, null);	
}

function refresh() {
	location.reload();
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(method, url, callbackFunction, requestJson) {
  // This is a sample server that supports CORS.
  var xhr = createCORSRequest(method, url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  
  if(method == 'POST' || method == 'PUT' || method == 'DELETE') {
	  xhr.setRequestHeader("Content-Type", "application/json");
  }

  // Response handlers.
  xhr.onload = function() {
	  if(this.status == 500) {
		  return;
	  } else if(method == 'GET') {
		  var jsonData = JSON.parse(this.responseText);
		  if(callbackFunction != null) {
			  callbackFunction(jsonData);
		  }
	  }
	  else {
		  if(callbackFunction != null) {
			  callbackFunction();
		  }
	  }
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  if(method == 'POST' || method == 'PUT' || method == 'DELETE') {
	  xhr.send(JSON.stringify(requestJson));
  } else {
	  xhr.send();
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function usernameExists() {
    var username = getCookie("username");
    if (username != "") {
       return true;
    } else {
        return false;
    }
}







