const User = require('../models/User');

class UserController{
  async index(req, res){
    const users = await User.findAll();
    return res.json(users);
  }
}

module.exports = new UserController();