const { User } = require("../tempModels/user");
const {
  userValidation,
  updateValidation,
  loginValidation,
} = require("../Validations/usersValidations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { error, value } = userValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userExist = await User.findOne({ username: value.username });
    if (userExist) {
      return res.status(400).json({ message: "this username already taken" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const user = await User.create({ ...value, password: hashedPassword });

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

async function getAllUsers(req, res) {
  const allUsers = await User.find().select("-password");

  res.status(200).json({ message: "all users", data: allUsers });
}

async function getSingleUser(req, res) {
  const { id } = req.params;

  try {
    const singleUser = await User.findById(id).select("-password");
    if (!singleUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user found", data: singleUser });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    const removedUser = await User.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;

  try {
    const { error, value } = updateValidation.validate(req.body);
    if (error) {
      return res.status(401).json({ error: error.details[0].message });
    }

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, value);

    res.status(200).json({ message: "user updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { error, value } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userExist = await User.findOne({ username: value.username });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    const checkPassword = await bcrypt.compare(
      value.password,
      userExist.password,
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        username: userExist.username,
        role: userExist.role,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.EXPIRES_IN },
    );

    res
      .status(200)
      .json({ message: "Logged in Successfully", data: { token } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  login
};
