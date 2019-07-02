const formSelector = document.getElementById("login_form");

const handleErrors = function(error) {
  alert("The submitted credentials are not valid; try again!");
}

formSelector.onsubmit = (event) => {
  event.preventDefault();
  $.post(host + "/api/login", $("#login_form").serialize())
  .done(response => {
      const jwt = JSON.parse(response).access_token;
      window.localStorage.setItem("jwt", jwt);
      alert("Login successful! You'll be redirected to the Homepage after selecting OK");
      window.location.href = "/";
  })
  .fail(handleErrors)
}
