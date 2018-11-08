var itemSearch;

function goToDetailsView(name) {
	window.location.href = "productDetails.html?searchQuery=" + name;
}

function generateDetails() {
	let params = (new URL(document.location)).searchParams;
	let searchQuery = params.get("searchQuery");
	makeCorsRequest(searchQuery);
}

//http://localhost:8080/store-2.0.3.RELEASE/store/items/search/red

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
function makeCorsRequest(query) {
  // This is a sample server that supports CORS.
  var url ='http://localhost:8080/store-2.0.3.RELEASE/store/items/search/' + query;
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}







