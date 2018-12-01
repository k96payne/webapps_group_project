// function httpGetAsync(theUrl, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             let resultData = JSON.parse(xmlHttp.responseText);
//             callback(resultData);
//         } else if (xmlHttp.readyState == 4)
//             callback(xmlHttp.status);

//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }
<<<<<<< HEAD

// function httpPostAsync(theUrl, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             callback(xmlHttp);
//         } else if (xmlHttp.readyState == 4)
//             callback(xmlHttp.status);

//     }
//     xmlHttp.open("POST", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

var username = undefined;

if (!isLoggedIn()) 
    window.location.assign('/myStocks-2.0.3.RELEASE/views/signin.html');
else {
    document.getElementById("logged").innerHTML = "Log Out";
}

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}
=======

// function httpPostAsync(theUrl, callback) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             callback(xmlHttp);
//         } else if (xmlHttp.readyState == 4)
//             callback(xmlHttp.status);

//     }
//     xmlHttp.open("POST", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }
>>>>>>> 5818014a6e53ca5e097ef89cc0152f97b8f2c3ff

function getItemId() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].toLowerCase();
        var value = cookies[i].split('=')[1].toLowerCase();
        if (name.indexOf("item") >= 0 && value != "" && value != " ") {
            return value;
        }
    }
    console.log("Item not found");
    return null;
}

var itemId = getItemId();

<<<<<<< HEAD


// var item = undefined;
// var username = undefined;

// httpGetAsync("/myStocks-2.0.3.RELEASE/store/items", function (data) {
//     var itemId = getItemId();
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].itemId == itemId) {
//             item = data[i];
//             console.log(item);
//             var start = document.getElementById("myparent");
//             var child1 = document.createElement("div");
//             child1.classList.add("text-center");
//             start.appendChild(child1);
//             var title = document.createElement("h1");
//             title.classList.add("bold");
//             title.classList.add("text-dark");
//             title.innerHTML = item.name;
//             child1.appendChild(title);
//             var desc = document.createElement("h3");
//             desc.classList.add("italic");
//             desc.innerHTML= item.shortDescription;
//             child1.appendChild(desc);
//             var details = document.createElement("p");
//             details.innerHTML= "Brand: " + item.brandName + "<br>Size: " + item.size + "<br>Color: " + item.color + "<br>Gender: " + item.gender;
//             child1.appendChild(details);
//             var price = document.createElement("p");
//             price.classList.add("italic");
//             price.innerHTML = "Price: <b><em>$ " + item.msrp + "</em></b>";
//             child1.appendChild(price);
//             var sale = document.createElement("h2");
//             sale.id = "sale";
//             sale.innerHTML = "SALE: $" + item.salePrice; 
//             child1.appendChild(sale);

=======


// var item = undefined;
// var username = undefined;

// httpGetAsync("/myStocks-2.0.3.RELEASE/store/items", function (data) {
//     var itemId = getItemId();
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].itemId == itemId) {
//             item = data[i];
//             console.log(item);
//             var start = document.getElementById("myparent");
//             var child1 = document.createElement("div");
//             child1.classList.add("text-center");
//             start.appendChild(child1);
//             var title = document.createElement("h1");
//             title.classList.add("bold");
//             title.classList.add("text-dark");
//             title.innerHTML = item.name;
//             child1.appendChild(title);
//             var desc = document.createElement("h3");
//             desc.classList.add("italic");
//             desc.innerHTML= item.shortDescription;
//             child1.appendChild(desc);
//             var details = document.createElement("p");
//             details.innerHTML= "Brand: " + item.brandName + "<br>Size: " + item.size + "<br>Color: " + item.color + "<br>Gender: " + item.gender;
//             child1.appendChild(details);
//             var price = document.createElement("p");
//             price.classList.add("italic");
//             price.innerHTML = "Price: <b><em>$ " + item.msrp + "</em></b>";
//             child1.appendChild(price);
//             var sale = document.createElement("h2");
//             sale.id = "sale";
//             sale.innerHTML = "SALE: $" + item.salePrice; 
//             child1.appendChild(sale);

>>>>>>> 5818014a6e53ca5e097ef89cc0152f97b8f2c3ff
//             var card5 = document.createElement("a");
//             card5.onclick = function () {
//                 if(isLoggedIn()){
//                     var url = '/myStocks-2.0.3.RELEASE/store/carts?productId='+ item.itemId +'&username=' + username;
//                     httpPostAsync(url, function(data){});
<<<<<<< HEAD

//                     window.location.assign("/myStocks-2.0.3.RELEASE/")
//                 }
//                 else window.location.assign("/myStocks-2.0.3.RELEASE/views/signin.html")
//             }
//             card5.classList.add("btn");
//             card5.classList.add("btn-primary");
//             card5.innerHTML = "<b>Add to cart</b>";
//             child1.appendChild(card5);

//             var card6 = document.createElement("a");
//             card6.onclick = function () {
//                     window.location.assign("/myStocks-2.0.3.RELEASE/#")
//             }
//             card6.classList.add("btn");
//             card6.classList.add("btn-primary");
//             card6.innerHTML = "<b>Go back</b>";
//             child1.appendChild(card6);

//         }
//     }
// });

function isLoggedIn() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var name = undefined;
        var value = undefined;
        try {
            name = cookies[i].split('=')[0].toLowerCase();
            value = cookies[i].split('=')[1].toLowerCase();
        } catch(err) {
            return false;
        }
        
        if (name.indexOf("username") >=0 && value!="" && value!=" ") {
            username = value;
            console.log("Logged in");
            return true;
        }
    }
    console.log("Not logged in");
    return false;
}
=======

//                     window.location.assign("/myStocks-2.0.3.RELEASE/")
//                 }
//                 else window.location.assign("/myStocks-2.0.3.RELEASE/views/signin.html")
//             }
//             card5.classList.add("btn");
//             card5.classList.add("btn-primary");
//             card5.innerHTML = "<b>Add to cart</b>";
//             child1.appendChild(card5);

//             var card6 = document.createElement("a");
//             card6.onclick = function () {
//                     window.location.assign("/myStocks-2.0.3.RELEASE/#")
//             }
//             card6.classList.add("btn");
//             card6.classList.add("btn-primary");
//             card6.innerHTML = "<b>Go back</b>";
//             child1.appendChild(card6);

//         }
//     }
// });

// function isLoggedIn() {
//     var cookies = document.cookie.split(';');
//     for (var i = 0; i < cookies.length; i++) {
//         var name = cookies[i].split('=')[0].toLowerCase();
//         var value = cookies[i].split('=')[1].toLowerCase();
//         if (name.indexOf("username") >=0 && value!="" && value!=" ") {
//             username = value;
//             console.log("Logged in");
//             return true;
//         }
//     }
//     console.log("Not logged in");
//     return false;
// }
>>>>>>> 5818014a6e53ca5e097ef89cc0152f97b8f2c3ff
