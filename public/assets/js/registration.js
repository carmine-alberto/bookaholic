
const formSelector = document.getElementById("registration_form");

const handleErrors = function(error) {
  alert("The provided credentials are not valid or belong to an existing user! Try again");
}

console.log(formSelector);

formSelector.onsubmit = (event) => {
  event.preventDefault();
  $.post(host + "/api/profile", $("#registration_form").serialize())
  .done(response => {
      alert("Registration successful! You'll be redirected to the Homepage after selecting OK");
      window.location.href = "/";
  })
  .fail(handleErrors)
}
