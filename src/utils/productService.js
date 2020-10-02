import tokenService from "./tokenService";

const BASE_URL = "/api/products/";

function create(productData) {
  console.log("i am in userService createProduct");
  console.log(productData);
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    }),
    body: JSON.stringify(productData),
  };
  return fetch(BASE_URL, options).then((res) => {
    console.log("I am in userService, and I got a create product response");
    if (res.ok) return res.json(res);
    throw new Error("Server-side: Unable to save");
  });
}

function index() {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

export default {
  index,
  create,
};
