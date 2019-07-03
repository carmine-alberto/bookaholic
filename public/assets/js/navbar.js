
const host = "";
const jwt = window.localStorage.getItem("jwt");

const getUsername = () => JSON.parse(window.atob(jwt.split(".")[1]))["username"];

const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const appendDataForListThemes = function(selector, list)
{
    for (var i = 0; i < list.length; i++)
    {
      selector.append(
        '<li id="theme_' + list[i] + '" role="option">' +
          '<a href="/theme?id=' + list[i] + '">' + capitalizeString(list[i]) + '</a>' +
        '</li>'
      )
    }
}


const appendDataForListGenres= function(selector, list)
{
  for (var i = 0; i < list.length; i++)
  {
    selector.append(
      '<li id="genre_' + list[i] + '" role="option">' +
        '<a href="/genre?id=' + list[i] + '">' + capitalizeString(list[i]) + '</a>' +
      '</li>'
    )
  }
}

const appendLoggedUserTabs = () => navbarRightSelector.append(
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

const appendNonLoggedUserTabs = () => navbarRightSelector.append(
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
)

const setActive = () => landmarksSelector.each(function() {
                                                if ($(this).attr("href").substring(1) == window.location.href.split("/")[3])
                                                  $(this).attr("id", "active");
                                                });


//MAIN
const genresListSelector = $("#genre_list");
const themesListSelector = $("#themes_list");
const navbarRightSelector = $(".navbar-right");
const landmarksSelector = $("#landmarks").find(".menu_item");


fetch(host+"/api/books/themes")
  .then(response => response.json())
  .then(themes=> appendDataForListThemes(themesListSelector, themes)
)
.then(
  fetch(host+"/api/books/genres")
  .then(response => response.json())
  .then(genres => appendDataForListGenres(genresListSelector, genres))
)
.then(() => {
  if (jwt != null) {
    appendLoggedUserTabs();
    $("#logout").on("click touch", function() {
                                    window.localStorage.removeItem("jwt");
                                    alert("Logout successful! You'll be redirected to the Homepage.");
                                    window.location.href = "/";
                                  });
  }
  else
    appendNonLoggedUserTabs();
})
.then(setActive);
