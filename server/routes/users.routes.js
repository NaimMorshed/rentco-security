const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserByEmail,
  getUserByPhone,
  postUser,
  deleteUser,
  getUserById,
  updateUser,
  login,
} = require("../controllers/users.controller");

router.get("/", getUser);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/phone/:phone", getUserByPhone);
router.get("/email/:email", getUserByEmail);
router.get("/id/:id", getUserById);
router.post("/login", login);

module.exports = router;
