const jwt = require("jsonwebtoken");
const secret = require("../config/jwt.config");

console.log(secret);

const generateToken = (res, user) => {
  console.log(user, "<==================");
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      user_role_id: user.user_role_id,
    },
    secret.secret,
    { expiresIn: secret.till }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: true,
  });

  return token;
};

module.exports = generateToken;
