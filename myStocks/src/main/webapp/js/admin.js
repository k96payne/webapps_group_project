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

httpGetAsync("/myStocks-2.0.3.RELEASE/myStocks/users/" + username, function(data) {
    if(data.isAdmin != 1) {
        window.location.assign('/myStocks-2.0.3.RELEASE/index.html');
    }
});

document.getElementById("delete").onclick = function () {
    var deletionUsername = document.getElementById("delete-username").value;
    httpDeleteAsync("/myStocks-2.0.3.RELEASE/myStocks/users/" + deletionUsername, function(data) {
        console.log(data);
            if (data >= 300) {
                alert("Something went wrong, please try again");
            } else {
                window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html")
            }
    });
}

document.getElementById("promote").onclick = function () {
    var promotionUsername = document.getElementById("promote-username").value;
    httpPutAsync("/myStocks-2.0.3.RELEASE/myStocks/users/promote/" + promotionUsername, function(data) {
        console.log(data);
            if (data >= 300) {
                alert("Something went wrong, please try again");
            } else {
                window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
            }
    });
}

document.getElementById("demote").onclick = function () {
    if(username == "root") {
        var demotionUsername = document.getElementById("demote-username").value;
        httpPutAsync("/myStocks-2.0.3.RELEASE/myStocks/users/demote/" + demotionUsername, function(data) {
            console.log(data);
                if (data >= 300) {
                    alert("Something went wrong, please try again");
                } else {
                    window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
                }
        });
    } 
    else {
        alert("Only the root admin can perform this operation");
        window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
    }
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
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
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
   // xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
}

function httpDeleteAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status < 300) {
            callback(xmlHttp.status);
        } else if (xmlHttp.readyState == 4)
            callback(xmlHttp.status);

    }
    xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
    //xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}

// httpGetAsync("/myStocks-2.0.3.RELEASE/myStocks/users/"+username, function(data){
//     console.log(data);
//     var fname = data.fname;
//     var lname = data.lname;
//     var email = data.email;
//     document.getElementById("username").innerText = username;
//     document.getElementById("email").innerText = email;
//     document.getElementById("fname").innerText = fname;
//     document.getElementById("lname").innerText = lname;
// })

//Create New User admin CRUD function
// document.getElementById("update").onclick = function () {
//     console.log(document.getElementById("email").innerText);
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     var fname = document.getElementById("fname").value;
//     var lname = document.getElementById("lname").value;
//     var encrypted = CryptoJS.AES.encrypt(password, 'web-apps').toString();
//     var url = "/myStocks-2.0.3.RELEASE/myStocks/users";

//     console.log(email, encrypted, fname, lname);

//     if(fname == null || fname == "" || lname == null || lname == "" || email == null || 
//         email == "" || password == null || password == "") {
// 		alert('Not all fields are filled');
// 	} else {
//         var requestObject = {};
//         requestObject.username = username;
// 	    requestObject.fname = fname;
// 	    requestObject.lname = lname;
//         requestObject.password = encrypted;
// 	    requestObject.email = email;

//     httpPutAsync(url, requestObject, function (data) {
//         console.log(data);
//             if (data >= 300) {
//                 document.getElementById("targ").innerHTML = "Please try again....";
//             } else {
//                 window.location.assign("/myStocks-2.0.3.RELEASE/views/profile.html")
//             }
//         });
//     }
// }

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