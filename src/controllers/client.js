const Address = require('../models/Address');
const Buy = require('../models/Buy');
const Client = require('../models/Client');

class ClientController{
  async findOneClientById(req, res){
    const client = await Client.findByPk(req.params.client_id, {
      include: [
        {
          model: Address,
          as: 'address',
          attributes: [ 'client_id', 'city', 'street', 'number' ]
        },
        {
          model: Buy,
          as: 'buys',
          attributes: ['is_paid']
        }
      ]
    });
    return res.json(client);
  }

  async index(req, res){
    const clients = await Client.findAll({
      include: [
        {
          model: Address,
          as: 'address'
        },
        {
          model: Buy,
          as: 'buys'
        }
      ]
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
