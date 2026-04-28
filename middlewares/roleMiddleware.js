function roleMiddleware(...role) {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "access denied" });
    }

    next();
  };
}

module.exports = roleMiddleware;

//if (req.user.role != role) {
//   return res.status(403).json({ message: "access denied" });
// }
