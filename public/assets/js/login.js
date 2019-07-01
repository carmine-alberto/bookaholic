const formSelector = document.getElementById("login_form");
const host = "https://bookaholic.herokuapp.com";

const handleErrors = function(response) {
  if (!response.ok)
    alert("The submitted credentials do not have a valid match. Please try again.");
  return response;
}

formSelector.onsubmit = (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(event.target));

  const fetchParams = {
    method: "POST",
    body: params
  };
  console.log(fetchParams.body.toString());

  fetch( host + "/api/profile", fetchParams)
  .then(handleErrors)
  .then(response => alert(response))
  .catch(error => alert("The following error has occurred: " + error));
}
