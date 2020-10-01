const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  createMyProduct,
  indexMyProducts,
  deleteMyProduct,
  updateMyProduct,
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}

async function createMyProduct(req, res) {
  console.log("i am in controller user createMyProduct");
  console.log("req body id = " + req.body.id);
  console.log(req.user);
  console.log("req.user id=" + req.user._id);

  let newProduct = {
    productID: req.body.id,
    myrating: 0,
    mynote: "",
  };
  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      user.products.push(newProduct);
      user.save(function (err) {
        if (err) return err;
      });
      res.json(req.body);
    });
  } catch (err) {
    res.json({ err });
  }
}

async function indexMyProducts(req, res) {
  console.log("I am in controller showMyProducts");
  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      console.log(user.products);
      res.json(user.products);
    });
  } catch (err) {
    res.json({ err });
  }
}

async function deleteMyProduct(req, res) {
  console.log("I am in controller deleteMyProducts");
  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      user.products.id(req.params.id).remove();
      user.save();
      // console.log(user.products);
      res.json(user.products);
    });
  } catch (err) {
    res.json({ err });
  }
}

async function updateMyProduct(req, res) {
  console.log("i am in controller user updateMyProduct");
  console.log("req params id = " + req.params.id);
  console.log("req.user id=" + req.user._id);
  console.log("req.body myrating =" + req.body.myrating);
  console.log("req.body mynote =" + req.body.mynote);

  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      user.products.id(req.params.id).set(req.body);
      user.save();
      res.json(req.body);
    });
  } catch (err) {
    res.json({ err });
  }
}

// async function isFavProduct(req, res) {
//   try {
//     console.log("-----------------------");
//     console.log("req.params.id = "+req.params.id);
//     console.log("req.user._id = "+req.user._id);
//     // const productAll = User.find({ user: req.user._id }, function (err) {
//     //   if (err) return err;
//     // });
//     // console.log(productAll);

//     User.findById(req.user._id, function (err, user) {
//       console.log("user.products is " + user.products);
//       user.products.forEach((productMongooseID) => {
//         console.log(
//           "productMongooseID.productID is " + productMongooseID.productID
//         );
//       });
//     });
//   } catch (err) {
//     res.json({ err });
//   }
//   console.log("my product is");
//   console.log("params.id is -->" + typeof req.params.id);
//   User.find({ "products.productID": parseInt(req.params.id) }, function (
//     err,
//     product
//   ) {
//     console.log("my product is");
//     console.log(product);
//     if (err) return err;
//     if (product && product.length > 0) {
//       console.log("i found my user's product ");
//       res.json({ success: true });
//     } else {
//       console.log("i did not my user's product ");
//       res.json({ success: false });
//     }
//   });
//   console.log("I finished searching and ok");
// } catch (err) {
//   console.log("something went wrong");
//   res.json({ err });
// }

// console.log(req);
// try {
// User.find({ products: { productID: req.params.id } }, function (
//     err,
//     products
//   ) {
//     if (err) return res.json({ success: err });

//     if (products) {
//       console.log("i found my user's product ");
//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }
//   });
//--------
// User.findById(req.user._id, function (err, user) {
//   console.log("i found my user = " + user._id);
//   if (err) return err;
//   user.products.find({ productID: req.params.id }, function (err) {
//     console.log("i found my user's product ");
//     if (err) return err;
//     res.json(true);
// });
// console.log("i did not found my user's product");
// } catch (err) {
//   res.json({ err });
// }
// }
