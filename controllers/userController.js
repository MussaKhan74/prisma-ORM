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
