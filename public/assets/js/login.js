const formSelector = document.getElementById("login_form");
const host = "https://bookaholic.herokuapp.com";

const handleErrors = function(response) {
  if (response.ok)
    return response;
  throw new Error("The submitted credentials are not valid; try again!");
}

formSelector.onsubmit = (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(event.target));

  const fetchParams = {
    method: "POST",
    body: params,
  };
  console.log(fetchParams.body);

  fetch( host + "/api/profile", fetchParams)
  .then(handleErrors)
  .then(response => alert(response.json()))
  .catch(error => alert("The following error has occurred: " + error.message));
  //$.post(host + "/api/login", $("#login_form").serialize(), data => alert(data));
}
