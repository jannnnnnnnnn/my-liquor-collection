const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

/*---------- Public Routes ----------*/
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.post("/products/:id", checkAuth, usersCtrl.createMyProduct);
router.get("/favourites", usersCtrl.indexMyProducts);
router.delete("/favourites/:id", checkAuth, usersCtrl.deleteMyProduct);
router.put("/favourites/:id", checkAuth, usersCtrl.updateMyProduct);

router.get("/locals", usersCtrl.indexMylocalProducts);
router.put("/locals/:id", checkAuth, usersCtrl.updateMylocalProduct);
router.delete("/locals/:id", checkAuth, usersCtrl.deleteMylocalProduct);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
