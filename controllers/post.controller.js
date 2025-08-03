const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  const post = new Post({ user: req.user._id, content: req.body.content });
  await post.save();
  res.send("Post created");
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "username name").sort({ date: -1 });
  res.send(posts);
};

exports.getYourPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).populate("user");
  res.send(posts);
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user');
  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
    await post.save();
  }
  res.send(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { content: req.body.content },
    { new: true }
  ).populate('user');
  if (!post) return res.status(404).send("Post not found or unauthorized");
  res.send(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!post) return res.status(404).send("Post not found or unauthorized");
  res.send("Post deleted");
};
