// const express = require('express');
// const auth = require("../middleware/auth");

// const {
//   addInvestment,
//   getInvestments,
//   deleteInvestment,
//   performanceInvesment,
// } = require('../controllers/investmentController');

// const router = express.Router();

// router.route('/',auth)
//   .post(addInvestment)
//   .get(getInvestments);
  

// router.get("/performance", auth , performanceInvesment);


// router.route('/:id' ,auth)
//   .delete(deleteInvestment);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  addInvestment,
  getInvestments,
  deleteInvestment,
  performanceInvesment,
} = require("../controllers/investmentController");

const auth = require("../middleware/auth"); // ✅ import middleware

// ✅ Protect routes with auth
router.post("/", auth, addInvestment);
router.get("/", auth, getInvestments);
router.delete("/:id", auth, deleteInvestment);
router.get("/performance", auth, performanceInvesment);

module.exports = router;