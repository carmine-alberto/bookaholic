
const host = "";
const jwt = window.localStorage.getItem("jwt");

//UTILITY FUNCTIONS
const getUsername = () => JSON.parse(window.atob(jwt.split(".")[1]))["username"];

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

//MAIN
const populateNavbar = () => {
  const genresListSelector = $("#genre_list");
  const themesListSelector = $("#themes_list");
  const navbarRightSelector = $(".navbar-right");
  const landmarksSelector = $("#landmarks").find(".menu_item");

  const setActive = (selector) => selector.each(function() {
                                                  if ($(this).attr("href").substring(1) == window.location.href.split("/")[3])
                                                    $(this).attr("id", "active");
                                                  });

  const appendNonLoggedUserTabs = (selector) => selector.append(
    '<li>' +
      '<a href="/login" role="navbaritem">' +
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
      '<a href="/registration" role="navbaritem">' +
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

  const appendLoggedUserTabs = (selector) => selector.append(
    '<li class="dropdown">' +
      '<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="menuitem">' +
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
      '<a href="/cart">' +
        '<span class="icon_name">' +
          '<img src="/assets/img/logo_cart.png"' +
               'alt="cart link"' +
               'class="icon"' +
               'tabindex="0"' +
               'role="link" />' +
          ' Cart' +
        '</span>' +
      '</a>' +
    '</li>'
  );

  const appendDataForListThemes = function(selector, list) {
      for (var i = 0; i < list.length; i++)
        selector.append(
          '<li id="theme_' + list[i] + '" role="option">' +
            '<a href="/theme?theme=' + list[i] + '">' + capitalizeString(list[i]) + '</a>' +
          '</li>'
        )
  };

  const appendDataForListGenres= function(selector, list) {
    for (var i = 0; i < list.length; i++) {
      selector.append(
        '<li id="genre_' + list[i] + '" role="option">' +
          '<a href="/genre?genre=' + list[i] + '">' + capitalizeString(list[i]) + '</a>' +
        '</li>'
      )
    }
  };

  Promise.all([
    fetch(host+"/api/books/themes")
    .then(response => response.json())
    .then(themes=> appendDataForListThemes(themesListSelector, themes))
    ,
    fetch(host+"/api/books/genres")
    .then(response => response.json())
    .then(genres => appendDataForListGenres(genresListSelector, genres))
  ])
  .then(() => {
    if (jwt != null) {
      appendLoggedUserTabs(navbarRightSelector);
      $("#logout").on("click touch", function() {
                                      window.localStorage.removeItem("jwt");
                                      alert("Logout successful! You'll be redirected to the Homepage.");
                                      window.location.href = "/";
                                    });
    }
    else
      appendNonLoggedUserTabs(navbarRightSelector);
  })
  .then(setActive(landmarksSelector));
}

const initNavbar = () => $("nav").append(
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
      '<div class="adjust-height">' +
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
                '<!-- All themes - filled by JavaScript -->' +
            '</ul>' +
          '</li>' +

          '<li><a href="/events" class="menu_item" role="menuitem">Events</a></li>' +

          '<li><a href="/about_us" class="menu_item" role="menuitem">About us</a></li>' +
        '</ul>' +

    		'<form class="navbar-form navbar-left" action="#">' +
          '<div class="input-group" id="searchbar">' +
            '<input title="searchbar" type="text" class="form-control" placeholder="Search" name="search" value="Search here">' +
            '<div class="input-group-btn">' +
              '<button title="search button" class="btn btn-default" type="submit">' +
                '<i class="glyphicon glyphicon-search"></i>' +
              '</button>' +
            '</div>' +
    	   '</div>' +
        '</form>' +

        '<ul class="nav navbar-nav navbar-right">' +
      	  '<!-- Actions - filled by JavaScript -->' +
        '</ul>' +
      '</div>' +
    '</div>' +
  '</div>'
);


initNavbar();
populateNavbar();
