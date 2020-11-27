const User = require('../models/User');

class ClientController{
  async index(req, res){
    const users = await User.findAll();
    return res.json(users);
  }

  async create(req, res){
    res.send("CREATE");
  }
}

module.exports = new ClientController();