function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            callback(resultData);
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
            callback(resultData);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpDeleteAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var x="";
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

var item = undefined;
var username = undefined;
isLoggedIn();

httpGetAsync("/myStocks-2.0.3.RELEASE/store/carts?username="+username, function (data) {
var totalPrice = 0;
    for (var i = 0; i < data.items.length; i++) {
        console.log(data);
            item = data.items[i];
            itemId = item.productId;
            totalPrice = item.salePrice + totalPrice;
            var start = document.getElementById("myparent");
            var child1 = document.createElement("div");
            child1.id = "target" + itemId;
            child1.classList.add("text-center");
            start.appendChild(child1);
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
                if(isLoggedIn()){
                    var url = '/myStocks-2.0.3.RELEASE/store/carts?cartId='+ data.cartId +'&productId=' + itemId;
                    httpDeleteAsync(url,null);
                    var bye = document.getElementById("target"+itemId);
                    bye.remove();
                }
            }
            card5.classList.add("btn");
            card5.classList.add("btn-primary");
            card5.innerHTML = "<b>Remove from cart</b>";
            child1.appendChild(card5);

            var card6 = document.createElement("a");
            card6.onclick = function () {
                    document.cookie="itemId=" +item.itemId+";path=/;"
                    window.location.assign("/myStocks-2.0.3.RELEASE/views/item.html")
            }
            card6.classList.add("btn");
            card6.classList.add("btn-primary");
            card6.innerHTML = "<b>View item</b>";
            child1.appendChild(card6);

            

        }
        var total = document.createElement("h3");
        total.innerHTML= "Total w/ tax: $" + (totalPrice*1.08).toFixed(2);
        var attach = document.getElementById("footer");
        attach.appendChild(total);

        var checkout = document.createElement("a");
        checkout.onclick = function () {
                var url = "/myStocks-2.0.3.RELEASE/store/carts/purchase/" + data.cartId;
                console.log(url);
                httpPutAsync(url,null);
                window.location.assign("/myStocks-2.0.3.RELEASE/")
            
        }
        checkout.classList.add("btn");
        checkout.classList.add("btn-warning");
        checkout.innerHTML = "<b>Checkout</b>";
        total.appendChild(checkout);

    
});

function isLoggedIn() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].toLowerCase();
        var value = cookies[i].split('=')[1].toLowerCase();
        if (name.indexOf("username") >=0 && value!="" && value!=" ") {
            username = value;
            console.log("Logged in");
            return true;
        }
    }
    console.log("Not logged in");
    return false;
}