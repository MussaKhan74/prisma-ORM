const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update/:id").put(isLoggedIn, updatePost);
router.route("/post/delete").delete(isLoggedIn, deletePost);
router.route("/post").get(getPosts);

module.exports = router;
