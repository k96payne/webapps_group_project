function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(200);
        }
        else if(xmlHttp.readyState==4)
            callback(xmlHttp.status);
        
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


document.getElementById("sign-in").onclick = function () {
    console.log("tile clicked");
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var url = "/online-store-app/store/customers?fname=" + fname + "&lname=" + lname + "&username=" + username + "&email=" + email;

    httpGetAsync(url, function(data){
        console.log(data);
        if(data!=200){
            document.getElementById("targ").innerHTML = "Please try again....";
        }
        else{
            document.cookie = "username=" + username + ";path=/;"
            window.location.assign("/online-store-app/views/cart.html")
        }
    });



}