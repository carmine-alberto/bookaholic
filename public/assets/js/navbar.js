
const host = ""; //Set for debugging purposes (localhost + remote API) - right now, all of the resources are laoded using relative paths
const jwt = window.localStorage.getItem("jwt");

//UTILITY FUNCTIONS
const getUsername = () => JSON.parse(window.atob(jwt.split(".")[1]))["username"];


const getFormattedDateTime = dateTime => {
  const dateTimeObject = new Date(dateTime);
  const dateTimeOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" }

  return dateTimeObject.toLocaleTimeString('en-EN', dateTimeOptions);
};

const check = string => console.log("Past " + string);

const modulo = (left, right) => {return (left % right + right) % right; };

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const createImgURL = imgName => "/assets/img/".concat(imgName);

const createAuthorsTag = (authors, tag) => authors.reduce( (taggedAuthors, author) =>
  taggedAuthors + '<' + tag + ' class="book_author">' + author["author_name"] + '</' + tag +'>', "");

const appendScrollingWrapperContent = (selector, data) => data.forEach(book =>
  selector.append(
      '<a href="/book?id=' + book["book_id"] +'">' +
        '<div class="card">' +
          '<img src="' + createImgURL(book["cover"]) + '" ' +
             'class="book_cover"' +
             'alt="book cover"' +
             'role="link" />' +
          '<div class="scrolling_caption">' +
            '<h6 class="book_title">' + book["title"] + '</h6>' +
            '<div class="authors_container">' +
              createAuthorsTag(book["authors"], "h6") +
            '</div>' +
          '</div>' +
        '</div>' +
      '</a>'
  )
);

const appendCarouselSlides = (selector, data) => {
  const itemsPerSlide = 5;
  const numOfSlides = Math.ceil(data.length / itemsPerSlide);

  const itemsLeftToAddModulo5 = multiplier => Math.min(itemsPerSlide, data.length - itemsPerSlide*multiplier);

  const appendSlide = slideIndex => {
    const appendArrowIfMoreThanOneSlide = tag => numOfSlides > 1 ? tag : "";

    selector.append(
      '<input type="radio" name="radio-buttons" id="slide_' + slideIndex + '" />' +  //The first one must have the property "checked"
      '<li class="slide-container">' +
        '<div class="slide-image"' +
              'role="group"' +
              'aria-roledescription="slide"' +
              'aria-label="slide ' + (slideIndex + 1) + ' of ' + numOfSlides + '">' +
          '<!-- Slide content - Filled by JavaScript -->' +
        '</div>' +
        '<div class="carousel-controls">' +
          '<label class="prev-slide" for="slide_' + modulo(slideIndex - 1, numOfSlides ) + '">' +
            appendArrowIfMoreThanOneSlide('<span>&lsaquo;</span>') +
          '</label>' +
          '<label class="next-slide" for="slide_' + modulo(slideIndex + 1, numOfSlides) + '">' +
            appendArrowIfMoreThanOneSlide('<span>&rsaquo;</span>') +
          '</label>' +
        '</div>' +
      '</li>'
    )
  };

  [...Array(numOfSlides).keys()].forEach(slideIndex => {
    appendSlide(slideIndex);
    console.log(itemsLeftToAddModulo5(slideIndex));
    [...Array(itemsLeftToAddModulo5(slideIndex)).keys()].forEach(itemIndexModulo5 => {
        const itemIndex = itemIndexModulo5 + slideIndex * itemsPerSlide;

        selector.find(".slide-image").last().append(
          '<a class="image_and_caption" href="/book?id=' + data[itemIndex]["book_id"] + '">' +
            '<img src="' + createImgURL(data[itemIndex]["cover"]) + '"' +
                  'alt="book cover"' +
                  'role="link" />' +
            '<div class="caption_container">' +
              '<h6 class="book_title">' + data[itemIndex]["title"] + '</h6>	' +
              '<div class="authors_container">' +
                createAuthorsTag(data[itemIndex]["authors"], "h6") +
              '</div>' +
            '</div>'+
          '</a>'
        )
    })
  });

  $("#slide_0").prop("checked", true);
};

const handleResponseStatusCode = response => { if (response.ok) return response; else throw new Error(response.status); };

const getUrlParametersAsObject = (url) => {
                                          var params = {};
                                          var questionSplit = url.split('?');
                                          questionSplit.shift();
                                          var onlyParameters = questionSplit.join('?');
                                          var splittedParameters = onlyParameters.split('&');

                                          for (var c = 0; c < splittedParameters.length; c++) {
                                              var parts = splittedParameters[c].split('=');
                                              if ($.trim(parts[0]) != '') {
                                                  params[parts[0]] = parts[1];
                                              }
                                          }
                                          return params;
                                      };

//NAVBAR HELPER FUNCTIONS
const setActive = (selector) => selector.each(function() {
                                                const hrefContent = $(this).attr("href");
                                                console.log(hrefContent);
                                                if (hrefContent != "#" && hrefContent.substring(1) == decodeURIComponent(window.location.href.split("/")[3])) {
                                                  $(this).attr("id", "active");
                                                  $(this).parents("ul").siblings("a").attr("id", "active");
                                                }
                                                });

const handleNavbarError = error => {
                              alert("Your token has expired, you'll be redirected to the login page");
                              window.localStorage.removeItem("jwt");
                              window.location.href = "/login";
                            };


//MAIN NAVBAR FUNCTIONS
const populateNavbar = () => {
  const genresListSelector = $("#genre_list");
  const themesListSelector = $("#themes_list");
  const navbarRightSelector = $(".navbar-right");


  const appendNonLoggedUserTabs = (selector) => selector.append(
    '<li>' +
      '<a href="/login" class="menu_item" role="navbaritem">' +
        '<span class="icon_name">' +
          '<img src="/assets/img/logo_profile.png"' +
               'alt="login link"' +
               'class="icon"' +
               'tabindex="0"' +
               'role="link" /> ' +
                  'Login' +
        '</span>' +
      '</a>' +
    '</li>' +

    '<li>' +
      '<a href="/registration" class="menu_item" role="navbaritem">' +
        '<span class="icon_name">' +
          '<img src="/assets/img/logo_profile.png"' +
               'alt="registration link"' +
               'class="icon"' +
               'tabindex="0"' +
               'role="link" /> ' +
                  'Sign Up' +
        '</span>' +
      '</a>' +
    '</li>'
  );

  const appendLoggedUserTabs = (selector, numberOfItemsInCart) => {
    selector.empty();
    selector.append(
    '<li class="dropdown">' +
      '<a class="dropdown-toggle menu_item" data-toggle="dropdown" href="#" role="menuitem">' +
        '<span class="icon_name">' +
          '<img src="/assets/img/logo_profile.png"' +
               'alt="profile link"' +
               'class="icon"' +
               'tabindex="0"' +
               'role="link" /> ' +
                  getUsername() +
        '</span>' +
      '</a>' +
      '<ul class="dropdown-menu"' +
          'tabindex="-1"' +
          'role="listbox"' +
          'aria-labelledby="actions">' +
        '<li role="option">' +
          '<a href="#">View profile</a>' +
        '</li>' +
        '<li id="logout" role="option">' +
          '<a href="#">Logout</a>' +
        '</li>' +
      '</ul>' +
    '</li>' +

    '<li>' +
      '<a href="/cart" class="menu_item" role="navbaritem">' +
        '<span class="icon_name">' +
          '<img src="/assets/img/logo_cart.png"' +
               'alt="cart link"' +
               'class="icon"' +
               'tabindex="0"' +
               'role="link" />' +
          ' Cart: ' + numberOfItemsInCart +
        '</span>' +
      '</a>' +
    '</li>'
    )
  };

  const appendDataForListThemes = list => {
                                            if (themesListSelector.children().length <= 1) //If only All Themes has been appended
                                              list.forEach(element => themesListSelector.append(
                                                  '<li role="option">' +
                                                    '<a href="/theme?theme=' + element + '">' + capitalizeString(element) + '</a>' +
                                                  '</li>'
                                                )
                                            )
                                          };

  const appendDataForListGenres = list => {
                                            if (genresListSelector.children().length <= 1)
                                              list.forEach(element => genresListSelector.append(
                                                  '<li role="option">' +
                                                    '<a href="/genre?genre=' + element + '">' + capitalizeString(element) + '</a>' +
                                                  '</li>'
                                                )
                                              )
                                          };

  Promise.all([
    fetch(host+"/api/books/themes")
    .then(response => response.json())
    ,
    fetch(host+"/api/books/genres")
    .then(response => response.json())
  ])
  .then( values => {
    Promise.all([
      Promise.resolve(appendDataForListThemes(values[0])),
      Promise.resolve(appendDataForListGenres(values[1])),
      new Promise((resolve, reject) => {
          if (jwt != null)
            fetch(host + "/api/cart", { method: "GET", headers: {"Authorization": "Bearer " + jwt } })
            .then(handleResponseStatusCode)
            .then(response => response.json())
            .then(response => Promise.resolve(new Promise((resolve, reject) => {//I swear I couldn't find a better solution, I don't even know why this works - TODO Ask for clarifications
              appendLoggedUserTabs(navbarRightSelector, response.length);
              $("#logout").on("click touch", function() {
                                              window.localStorage.removeItem("jwt");
                                              alert("Logout successful! You'll be redirected to the Homepage.");
                                              window.location.href = "/";
                                            });

            }))
            .then(setActive($(".nav").find("a"))))
            .catch(handleNavbarError);
          else
            appendNonLoggedUserTabs(navbarRightSelector);
        resolve();
      })
    ])
    .then(setActive($(".nav").find("a")));
  });
};


const initNavbar = new Promise((resolve, reject) => {
  $("nav").append(
    '<div class="container-fluid">' +
      '<div class="navbar-header">' +
        '<button title="menu_icon" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" role="button" id="menu_icon">' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
          '<span class="icon-bar"></span>' +
        '</button>' +

        '<a class="navbar-brand" id="bookaholic_logo" href="/"><img src="/assets/img/bookaholic_logo.png" alt="bookaholic logo"></a>' +
      '</div>' +
      '<div class="collapse navbar-collapse" id="myNavbar">' +
        '<ul class="nav navbar-nav" id="landmarks">' +
          '<li><a href="/" class="menu_item" role="menuitem">Home</a></li>' +

          '<li><a href="/authors" class="menu_item" role="menuitem">Authors</a></li>' +

  		    '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="menuitem">Genres<span class="caret"></span></a>' +
            '<ul class="dropdown-menu"' +
         			  'id="genre_list"' +
        			  'tabindex="-1"' +
        			  'role="listbox"' +
        			  'aria-labelledby="genre">' +
                '<li role="option">' +
                  '<a href="/genres">All Genres</a>' +
                '</li>' +
                '<!-- All genres - filled by JavaScript -->' +
            '</ul>' +
          '</li>' +

          '<li class="dropdown">' +
            '<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="menuitem">Themes<span class="caret"></span></a>' +
            '<ul class="dropdown-menu"' +
          		  'id="themes_list"' +
          		  'tabindex="-1"' +
          		  'role="listbox"' +
          		  'aria-labelledby="theme">' +
              '<li role="option">' +
                '<a href="/themes">All Themes</a>' +
              '</li>' +
              '<!-- All themes - filled by JavaScript -->' +
            '</ul>' +
          '</li>' +

          '<li><a href="/events" class="menu_item" role="menuitem">Events</a></li>' +

          '<li><a href="/about_us" class="menu_item" role="menuitem">About us</a></li>' +
        '</ul>' +

    		'<form class="navbar-form navbar-left" action="#">' +
          '<div class="input-group" id="searchbar">' +
            '<input title="searchbar" type="text" class="form-control" placeholder="Search here" name="search" disabled />' +
            '<div class="input-group-btn">' +
              '<button title="search button" class="btn btn-default" type="submit" disabled>' +
                '<i class="glyphicon glyphicon-search"></i>' +
              '</button>' +
            '</div>' +
    	   '</div>' +
        '</form>' +

        '<ul class="nav navbar-nav navbar-right">' +
      	  '<!-- Actions - filled by JavaScript -->' +
        '</ul>' +
      '</div>' +
    '</div>'
  );
  resolve();
});

initNavbar
.then(populateNavbar);
