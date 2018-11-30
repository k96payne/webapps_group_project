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

function httpPutAsync(theUrl, requestObject, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(requestObject));
}

httpGetAsync("/myStocks-2.0.3.RELEASE/myStocks/users/"+username, function(data){
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


document.getElementById("update").onclick = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var url = "/myStocks-2.0.3.RELEASE/myStocks/users";

    var requestObject = {};
    requestObject.username = username;
	requestObject.fname = fname;
	requestObject.lname = lname;
    requestObject.password = password;
	requestObject.email = email;

    httpPutAsync(url, requestObject, function (data) {
        console.log(data);
        if (data >= 300) {
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