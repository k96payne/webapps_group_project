//console.log("hello");

var serverData = undefined;

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let resultData = JSON.parse(xmlHttp.responseText);
            console.log(resultData, typeof (resultData));
            callback(resultData);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


httpGetAsync('/online-store-app/store/items', function (data) {
    serverData = data;
    clearDOM();
    populateDOM(data, 0);
});



function populateDOM(data, option) {
    if (option == 0) {
        var start = document.getElementById("myparent");
        var tileStart = document.createElement("div");
        tileStart.classList.add("card-deck");
        tileStart.id = "tilestart";
        start.appendChild(tileStart);
    }

    for (let i = 0; i < 15 && i < data.length; i++) {
        if (option == 0) {
            createTile(data[i]);
            continue;
        }
        createList(data[i]);
    }

}

document.getElementById("option1").onchange = function () {
    clearDOM();
    populateDOM(serverData, 0);
};

document.getElementById("option2").onchange = function () {
    clearDOM();
    populateDOM(serverData, 1);
};

if(isLoggedIn()){
    document.getElementById("logged").innerHTML = "Log Out";
}

document.getElementById("logged").onclick = function() {
    if(isLoggedIn()){
        document.cookie="username=;path=/;"
    }
}

function clearDOM() {
    var start = document.getElementById("myparent");
    start.innerHTML = "";
}


function createList(data) {

    var start = document.getElementById("myparent");
    var cardStart = document.createElement("div");
    cardStart.classList.add("card");
    start.appendChild(cardStart);

    var card2 = document.createElement("div");
    card2.classList.add("card-body");
    cardStart.appendChild(card2);

    var card3 = document.createElement("h5");
    card3.classList.add("card-title");
    card3.innerHTML = data.name;
    card2.appendChild(card3);

    var card4 = document.createElement("p");
    card4.classList.add("card-text");
    card4.innerHTML = data.shortDescription;
    card2.appendChild(card4);


    var card5 = document.createElement("a");
    card5.classList.add("text-right");
    card5.classList.add("btn");
    card5.classList.add("btn-primary");
    card5.onclick = function () {
        var x = document.cookie;
        document.cookie = "itemId=" + data.itemId + ";path=/;"
        console.log(x);
        if(isLoggedIn()){
            window.location.assign("/online-store-app/views/item.html")
        }
        else window.location.assign("/online-store-app/views/signin.html")
    }
    card5.innerHTML = "View Details";
    card2.appendChild(card5);

}

function createTile(data) {

    var start = document.getElementById("tilestart");
    var cardStart = document.createElement("div");
    cardStart.classList.add("card");
    cardStart.classList.add("text-center");
    start.appendChild(cardStart);

    var insert = document.createElement("canvas");
    cardStart.appendChild(insert);
    console.log(insert);
    //var ctx = $("#myChart");

    var myChart = new Chart(insert, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var card2 = document.createElement("div");
    card2.classList.add("card-body");
    cardStart.appendChild(card2);

    var card3 = document.createElement("h5");
    card3.classList.add("card-title");
    card3.innerHTML = data.name;
    card2.appendChild(card3);

    var card4 = document.createElement("p");
    card4.classList.add("card-text");
    card4.innerHTML = data.shortDescription;
    card2.appendChild(card4);

    var card5 = document.createElement("a");
    card5.onclick = function () {
        var x = document.cookie;
        document.cookie = "itemId=" + data.itemId + ";path=/;"
        console.log(x);
            window.location.assign("/online-store-app/views/item.html")
    }
    card5.classList.add("btn");
    card5.classList.add("btn-primary");
    card5.innerHTML = "View Details";
    card2.appendChild(card5);

}

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
