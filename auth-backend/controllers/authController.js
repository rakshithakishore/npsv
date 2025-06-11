const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, email, password, phone, dob } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      phone,
      dob,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email or username

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};
