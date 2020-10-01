const Product = require("../models/product");
const User = require("../models/user");

module.exports = {
  createProduct,
};

async function createProduct(req, res) {
  console.log("i am in controller Product createProduct");
  console.log("req.user id=" + req.user._id);
  console.log("req body = " + req.body);
  console.log("req.body name =" + req.body.name);
  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      user.save(function (err) {
        if (err) return err;
        const product = new Product(req.body);
        product.users.push(user);
        product.save(function (err) {
          if (err) return err;
          user.local_products.push(product);
          user.save(function (err) {
            if (err) return err;
            res.json(req.body);
          });
        });
      });
    });
  } catch (err) {
    res.json({ err });
  }
  // try {
  //   const product = new Product({ ...req.body, users: req.user._id });
  //   product.save();
  // find user, user.product.push
  //   res.json(req.body);
  // } catch (err) {
  //   res.json({ err });
  // }
}
