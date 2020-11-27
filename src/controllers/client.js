const Client = require('../models/Client');

class ClientController{
  async index(req, res){
    const clients = await Client.findAll({
      include: {
        association: 'address'
      }
    });
    return res.json(clients);
  }

  async create(req, res){
    try{
      const client = await Client.create({
        user_id: req.requester.id,
        ...req.body
      })
      
      return res.json(client);
    }catch(err){
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }
}

module.exports = new ClientController();