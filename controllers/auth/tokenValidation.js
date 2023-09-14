const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["X-Access-Token"];

  if (!token) {
    return res.status(403).json({
      status: 403,
      success: false,
      message: "Token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Invalid token",
    });
  }
  return next();
};

module.exports = verifyToken;
