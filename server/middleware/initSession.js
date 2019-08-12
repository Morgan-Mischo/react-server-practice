module.exports = (req, res, next) => {
    if (!req.session.writer) req.session.writer = {};
    next();
  };