const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  createProduct,
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

async function createProduct(req, res) {
  console.log("i am in controller user saveProduct");
  console.log("req body id = " + req.body.id);
  console.log(req.user);
  console.log("req.user id=" + req.user._id);
  // let x = req.body;
  // return res.status(200).json(x);

  let newProduct = {
    productID: req.body.id,
    myrating: 0,
    mynotes: "",
  };
  try {
    User.findById(req.user._id, function (err, user) {
      console.log("i found my user and = " + user._id);
      if (err) return err;
      user.products.push(newProduct);
      user.save();
      res.json(req.body);
    });
  } catch (err) {
    res.json({ err });
  }
}
