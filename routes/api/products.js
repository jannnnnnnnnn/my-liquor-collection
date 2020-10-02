const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

router.get("/", productsCtrl.index);

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.post("/", checkAuth, productsCtrl.create);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
