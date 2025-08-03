const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const { username, name, age, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = new User({ username, name, age, email, password: hashedPass });
  await user.save();
  res.send("Signup Successful");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Wrong Password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send({ token });
};
