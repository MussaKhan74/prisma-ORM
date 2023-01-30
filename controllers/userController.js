const prisma = require("../prisma");
const cookieToken = require("../utils/cookieToken");

// user singup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check
    if (!name || !email || !password) {
      throw new Error("All fields must be provided!");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // send user a token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// login user

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password!");
    }

    // find a user based on email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // when there is no user
    if (!user) {
      throw new Error("User not found!");
    }

    if (user.password !== password) {
      throw new Error("password is incorrect!");
    }

    // user is there and validated
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// logout user

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    throw new Error(error);
  }
};
