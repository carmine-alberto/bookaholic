
const formSelector = document.getElementById("registration_form");

const handleErrors = function(error) {
  switch(error.status) {
    case 403:
      alert("The provided credentials belong to an existing user!\nTry with a different username or e-mail.");
      break;
    default:
      alert("Something unexpected has occurred. Check your connection and try again.");
    }
}

console.log(formSelector);

formSelector.onsubmit = (event) => {
  event.preventDefault();
  $.post(host + "/api/profile", $("#registration_form").serialize())
  .done(response => {
      alert("Registration successful!\nYou'll be redirected to the Homepage after selecting OK");
      window.location.href = "/";
  })
  .fail(handleErrors)
}
