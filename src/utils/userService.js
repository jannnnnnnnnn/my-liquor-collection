import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function saveProduct(product) {
  console.log("i am in userService saveProduct, " + product.id);
  return fetch(BASE_URL + "products/" + product.id, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
    body: JSON.stringify(product),
  }).then((res) => {
    console.log("I am in userService, and i got an save product response");
    if (res.ok) return res.json();
    throw new Error("Server-side: Unable to save");
  });
}

function alreadyFavorite(productId) {
  console.log("i am in userService alreadyFav=" + productId);
  // return fetch(BASE_URL+"products/"+productId)

  if (productId == 18) {
    return true;
  } else {
    return false;
  }
}

export default {
  signup,
  getUser,
  logout,
  login,
  saveProduct,
  alreadyFavorite,
};
