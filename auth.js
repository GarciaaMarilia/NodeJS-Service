const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

const authenticationToken = (req, res, next) => {
 const authHeader = req.headers["authorization"];
 const token = authHeader && authHeader.split(" ")[1];

 if (token === null) {
  res.statusCode = 401;
  return res.end("Access Denied: No Token Provided");
 }

 jwt.verify(token, SECRET_KEY, (err, user) => {
  if (err) {
   res.statusCode = 403;
   return res.end("Access Denied: Invalid Token");
  }
  req.user = user;
  next();
 });
};

module.exports = { authenticationToken, SECRET_KEY };
