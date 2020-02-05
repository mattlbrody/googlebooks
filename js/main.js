// add event to element with id="button"
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', bookSearch, false);

// This is code so the enter key also fires (runs/invokes/instantiates) the function
var search = document.getElementById('search');
search.addEventListener('keypress', function enterKey(e) {
	if(e.keyCode == 13) {
		bookSearch();
	};
}, false);

function bookSearch() {
    
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // store user input
    var search = document.getElementById("search").value;
    console.log(search)

    // clear any previous data after each new search
    document.getElementById("results").innerHTML = "";

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + search, true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        console.log(data)

        // loop through data in data.items
        for (var i = 0; i < data.items.length; i++) {

            // store current books volume info
            var jdata = data.items[i].volumeInfo;

            // create elements
            var newColSm4 = document.createElement('div');
            var newImg = document.createElement('img');
            var newH2 = document.createElement('h2');
            var newH3 = document.createElement('h3');
            var newH4 = document.createElement('h4');
            var newAnchor = document.createElement('a');

            // add classes to elements
            newColSm4.className = 'col-sm-12 col-md-8 col-md-offset-2 item';

            // add h2 text
            newH2.innerText = jdata.title;

            // add a tag attributes and text
            newAnchor.className = 'btn btn-primary';
            newAnchor.innerText = 'Learn More';
            newAnchor.href = jdata.infoLink;
            newAnchor.setAttribute('target', '_blank');

            // add image or create add a no image one if it doesn't exist
            if (jdata.imageLinks) {
                newImg.src = jdata.imageLinks.thumbnail;
            } else {
                newImg.src = 'img/nobook.jpg';
            };

            // add published data or give text that it wasn't found
            if (jdata.publishedDate) {
                newH4.innerText = jdata.publishedDate;
            } else {
                newH4.innerText = 'no publish date found';
            };

            // add author or give text that it wasn't found
            if (jdata.authors) {
                newH3.innerText = jdata.authors[0];
            } else {
                newH3.innerText = 'no author found';
            };

            // add tags to document
            newColSm4.appendChild(newImg);
            newColSm4.appendChild(newH2);
            newColSm4.appendChild(newH3);
            newColSm4.appendChild(newH4);
            newColSm4.appendChild(newAnchor);

            // add results to the screen
            var results = document.getElementById("results");
            results.appendChild(newColSm4);
        };
    }

    // Send request
    request.send()
}
