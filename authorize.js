const authorizeRoles = (...roles) => {
 return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   res.statusCode = 403;
   return res.end("Access Denied: you do not have the required role");
  }
  next();
 };
};

module.exports = { authorizeRoles };
