$(document).ready(function() {
    var myUl = document.querySelector("ul");
    $.get('v2/books/123')
    .done( response =>  response.json() )
    .then( json => {
        for(let i = 0; i< json.length; i++) {
            let listItem = document.createElement("li");
            let custImg = document.createElement("img");
            let linkToPage2 = document.createElement("a");
            let { title, author, price } = json[i];
            custImg.src = "randimg.png";
            linkToPage2.href = "/secondPage.html";
            listItem.innerHTML = `${title} - ${author} - ${price.value} ${price.currency}`;
            myUl.append(listItem);
            linkToPage2.append(custImg);
            myUl.append(linkToPage2);
            if (price.value < 10) {
                myUl.style.backgroundColor = "pink";
            }
        }
    });
});