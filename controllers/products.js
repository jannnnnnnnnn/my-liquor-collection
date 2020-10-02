const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
  index,
  create,
};

async function create(req, res) {
  console.log("i am in controller Product createProduct");
  console.log("req.user id=" + req.user._id);
  console.log("req body = " + req.body);
  console.log("req.body name =" + req.body.name);
  try {
    const user = await User.findById(req.user._id);
    const product = await new Product(req.body);
    await product.users.push(user);
    await product.save();
    user.local_products.push(product);
    await user.save();
    console.log("finished with this 1");
    let productID = product._id.toString();
    console.log("productID = " + productID);
    console.log("productID type = " + typeof productID);
    // createMylocals
    //------------
    let newLocalProduct = {
      productID: productID,
      myrating: 0,
      mynote: "",
    };
    console.log("newLocalProduct = " + newLocalProduct.productID);
    user.mylocals.push(newLocalProduct);
    console.log("finished with this 2");
    await user.save(function (err) {
      console.log("finished with this 3");
      if (err) return err;
      console.log("finished with this 4");
    });
    // console.log("finished with this");
    // await user.save();
    res.json(req.body);
  } catch (err) {
    res.json({ err });
  }
}

async function index(req, res) {
  const products = await Product.find({});
  // Default to a limit of 20 high scores
  // if not specified in a query string
  // .limit(req.query.limit || 20);
  res.json(products);
}
