
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            console.log(resultData, typeof (resultData));
            callback(resultData);
        }
        else if(xmlHttp.readyState==4)
            callback(0);
        
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

document.getElementById("create-account").onclick = function() {
    window.location.assign("/myStocks-2.0.3.RELEASE/views/signup.html")
}

document.getElementById("sign-in").onclick = function () {
    console.log("tile clicked");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var encrypted = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    console.log(encrypted);
    console.log("Checking if " + username + " exists....");
    var url = '/myStocks-2.0.3.RELEASE/myStocks/users/validate?username=' + username + "&password=" + encrypted;
    httpGetAsync(url, function(data){
        if(data.userExists == "false"){
            console.log(username + " does not exist, must sign up!");
            document.cookie = "username=;";
            window.location.assign("/myStocks-2.0.3.RELEASE/views/signup.html");
        }
        else if(data.valid == "false") {
            alert("Password Incorrect, Try Again.");
        }
        else{
            document.cookie = "username=" + username + ";path=/;";
            if(data.isAdmin == "true") {
                window.location.assign("/myStocks-2.0.3.RELEASE/views/admin.html");
            } else {
                window.location.assign("/myStocks-2.0.3.RELEASE/index.html");
            }     
        }
        var x = document.cookie;
        console.log("printing out the cookie -------> " + x);

    });
};

