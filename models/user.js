const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const myproductSchema = new mongoose.Schema({
  productID: Number,
  myrating: Number,
  mynote: String,
  // food_pairing: {
  //   type: mongoose.Schema.Types.ObjectIdring,
  //   //ref allows us to use Unicorn???
  //   ref:"food",
  // },
  // weather_paring: {
  //   type: mongoose.Schema.Types.ObjectIdring,
  //   ref:"weather",
  // },
});

const mylocal_productSchema = new mongoose.Schema({
  productID: Number, // store Local Product schema ID
  myrating: Number,
  mynote: String,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    products: [myproductSchema],
    local_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    mylocal_products: [mylocal_productSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", function (next) {
  // 'this' will be set to the current document
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
