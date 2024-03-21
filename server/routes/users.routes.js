const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserByEmail,
  getUserByPhone,
  postUser,
  deleteUser,
  getUserById,
  updateUser
} = require("../controllers/users.controller");

router.get("/", getUser);
router.get("/phone/:phone", getUserByPhone);
router.get("/email/:email", getUserByEmail);
router.get("/id/:id", getUserById);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
