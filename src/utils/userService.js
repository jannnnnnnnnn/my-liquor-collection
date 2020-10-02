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

function createMyProduct(product) {
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
    if (res.ok) return res.json(res);
    throw new Error("Server-side: Unable to save");
  });
}

function updateMyProduct(product_id, myProductInfo) {
  console.log("i am in userservice updateMyProduct");
  console.log(product_id);
  console.log(myProductInfo);
  const options = {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
    body: JSON.stringify(myProductInfo),
  };
  return fetch(BASE_URL + "favourites/" + product_id, options).then((res) =>
    res.json(res.body)
  );
}

function indexMyProducts() {
  console.log("i am in userService indexMyProducts");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL + "favourites", options).then((res) =>
    res.json(res.body)
  );
}

function deleteMyProduct(product_id) {
  console.log("i am in userservice deleteMyProduct");
  console.log(product_id);
  const options = {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
  };
  return fetch(BASE_URL + "favourites/" + product_id, options).then((res) =>
    res.json(res.body)
  );
}

function indexMylocalProducts() {
  console.log("i am in userService indexMylocalProducts");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL + "locals", options).then((res) => res.json(res.body));
}

function updateMylocalProduct(product_id, myProductInfo) {
  console.log("i am in userservice updateMylocalProduct");
  console.log(product_id);
  console.log(myProductInfo);
  const options = {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
    body: JSON.stringify(myProductInfo),
  };
  return fetch(BASE_URL + "locals/" + product_id, options).then((res) =>
    res.json(res.body)
  );
}

function deleteMylocalProduct(product_id) {
  console.log("i am in userservice deleteMylocalProduct");
  console.log(product_id);
  const options = {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
  };
  return fetch(BASE_URL + "locals/" + product_id, options).then((res) =>
    res.json(res.body)
  );
}

export default {
  signup,
  getUser,
  logout,
  login,
  createMyProduct,
  indexMyProducts,
  updateMyProduct,
  deleteMyProduct,
  indexMylocalProducts,
  updateMylocalProduct,
  deleteMylocalProduct,
};

// function alreadyFavorite(productId) {
//   console.log("i am in userService alreadyFav=" + productId);
//   return fetch(BASE_URL + "products/" + productId, {
//     method: "GET",
//     headers: new Headers({
//       Authorization: "Bearer " + tokenService.getToken(),
//     }),
//   }).then((res) => {
//     console.log("response for ", productId, " is ");
//     console.log(res.success);
//     if (res.ok) return res.json(res);
//     throw new Error("Server-side: Uable to lookup this product");
//   });
// }
