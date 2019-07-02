
const jwt = window.localStorage.getItem("jwt");

const handleErrors = function(response) {
  if (response.ok)
    return response;
  else
    throw new Error("Your access token is invalid or expired.\nYou'll be redirected to the login page.\nSelect OK to continue.");
}

if (jwt == null) {
  alert("You must be logged in to see this page!\nYou'll be redirected to the login page.\nClick OK to continue.");
  window.location.href = "/login";
}
else {
  const requestParams = {
                          method: "GET",
                          headers: {"Authorization": "Bearer " + jwt}
                        };


  fetch(host + "/api/cart", requestParams)
  .then(handleErrors)
  .then(response => alert("ok"))
  .catch(error => {
      alert(error.message);
      window.location.href = "/login";
  });
}
