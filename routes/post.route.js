const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const {
  createPost,
  getAllPosts,
  getYourPosts,
  likePost,
  updatePost,
  deletePost
} = require("../controllers/post.controller");

router.post("/post", verify, createPost);
router.get("/tweets", getAllPosts);
router.get("/yourtweets", verify, getYourPosts);
router.post("/like/:id", verify, likePost);
router.put("/update/:id", verify, updatePost);
router.delete("/delete/:id", verify, deletePost);

module.exports = router;
