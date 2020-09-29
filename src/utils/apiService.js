function getProductbyName(name) {
  // let proxyurl = "https://cors-anywhere.herokuapp.com/";
  // let uri = 'https://s3-us-west-1.amazonaws.com/gcodes-ext-logos/dev+test/member.json'

  // let endpoint = `http://138.197.138.159:3000/products/?q=${name}`;
  // let endpoint = `http://138.197.138.159:3000/products/438457`;
  // let endpoint = `http://138.197.138.159:3000/products?access_key=12345`;
  // let endpoint =`https://sandbox-api.brewerydb.com/v2/${name}/?key=b5e5a78c2c3c730e53b866ab7a5594d5`;
  let endpoint = `https://api.punkapi.com/v2/beers?beer_name=${name}`;
  return fetch(endpoint).then((res) => res.json());

  // return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
  // return fetch(proxyurl + endpoint, {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  // });
}

function getProductbyId(id) {
  let endpoint = `https://api.punkapi.com/v2/beers/${id}`;
  return fetch(endpoint).then((res) => res.json());
}

export default {
  getProductbyId,
  getProductbyName,
};
