var username = undefined;
if (!isLoggedIn())
    window.location.assign('/myStocks-2.0.3.RELEASE/views/signin.html');

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            console.log(resultData, typeof (resultData));
            callback(resultData)
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPutAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(200);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync("/myStocks-2.0.3.RELEASE/store/customers/"+username, function(data){
    console.log(data);
    var fname = data.fname;
    var lname = data.lname;
    var email = data.email;
    var list = document.getElementById("currentInfo");
    var currUser = document.createElement("li");
    currUser.innerHTML=username;
    list.appendChild(currUser);
    var first = document.createElement("li");
    first.innerHTML = fname;
    list.appendChild(first);
    var last = document.createElement("li");
    last.innerHTML = lname;
    list.appendChild(last);
    var email1 = document.createElement("li");
    email1.innerHTML = email;
    list.appendChild(email1);

})


document.getElementById("sign-in").onclick = function () {
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var url = "/myStocks-2.0.3.RELEASE/store/customers?fname=" + fname + "&lname=" + lname + "&username=" + username + "&email=" + email;

    httpPutAsync(url, function (data) {
        console.log(data);
        if (data != 200) {
            document.getElementById("targ").innerHTML = "Please try again....";
        } else {
            window.location.assign("/myStocks-2.0.3.RELEASE/views/profile.html")
        }
    });
}

function isLoggedIn() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].toLowerCase();
        var value = cookies[i].split('=')[1].toLowerCase();
        if (name.indexOf("username") >= 0 && value != "" && value != " ") {
            username = value;
            console.log("Logged in");
            return true;
        }
    }
    console.log("Not logged in");
    return false;
}

httpGetAsync("/myStocks-2.0.3.RELEASE/store/carts?username=" + username, function (data) {
    console.log(data);
    for (var j = 0; j < data.length; i++) {
        console.log("here")
        var start = document.getElementById("myparet");
        var head = document.createElement("h1");
        var cartNum = data.cartId;
        head.innerHTML = "Cart Number: " + cartNum;
        start.appendChild(head);
        for (var i = 0; i < data.items.length; i++) {
            console.log(data);
            item = data.items[i];
            itemId = item.productId;
            var child1 = document.createElement("div");
            child1.id = "target" + itemId;
            child1.classList.add("text-center");
            head.appendChild(child1);
            var title = document.createElement("h3");
            title.classList.add("bold");
            title.classList.add("text-dark");
            title.innerHTML = item.productName;
            child1.appendChild(title);
            var price = document.createElement("p");
            price.classList.add("italic");
            price.innerHTML = "Price: <b><em>$ " + item.msrp + "</em></b>";
            child1.appendChild(price);
            var sale = document.createElement("h5");
            sale.id = "sale";
            sale.innerHTML = "SALE: $" + item.salePrice;
            child1.appendChild(sale);

            var card5 = document.createElement("a");
            card5.onclick = function () {
                if (isLoggedIn()) {
                    var url = '/myStocks-2.0.3.RELEASE/store/carts?cartId=' + data.cartId + '&productId=' + itemId;
                    httpDeleteAsync(url, null);
                    var bye = document.getElementById("target" + itemId);
                    bye.remove();
                }
            }
            card5.classList.add("btn");
            card5.classList.add("btn-primary");
            card5.innerHTML = "<b>Remove from cart</b>";
            child1.appendChild(card5);

            var card6 = document.createElement("a");
            card6.onclick = function () {
                document.cookie = "itemId=" + item.itemId + ";path=/;"
                window.location.assign("/myStocks-2.0.3.RELEASE/views/item.html")
            }
            card6.classList.add("btn");
            card6.classList.add("btn-primary");
            card6.innerHTML = "<b>View item</b>";
            child1.appendChild(card6);

        }
    }

});