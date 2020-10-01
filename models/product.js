const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    liquor_type: String,
    manufacture: String,
    description: String,
    food_pairing: Array,
    img_url: String,
    abv: Number,
    ibu: Number,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
