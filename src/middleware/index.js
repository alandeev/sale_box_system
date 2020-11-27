const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => { //eslint-disable-line
  const { authorization } = req.headers;

  if (!authorization) { return res.status(401).json({ error: 'token not provided' }); }

  const tokenSplited = authorization.split(' ');

  if (tokenSplited.length !== 2) { return res.status(401).json({ error: 'Token malformated' }); }

  const [schema, token] = tokenSplited;

  if (schema !== 'Bearer') { return res.status(401).json({ error: 'Token malformated' }); }

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) { return res.status(401).send({ error: 'Token is invalid or expired' }); }

    const user = await User.findByPk(decoded.user_id);
    if (!user) { return res.status(400).send({ error: 'Account not found' }); }

    req.requester = user;
    return next();
  });
};
