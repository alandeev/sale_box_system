const Address = require('../models/Address');

class AddressController{
  async index(req, res){
    const addresses = await Address.findAll({
      include: {
        association: 'owner'
      }
    });
    return res.json(addresses);
  }

  async create(req, res){
    try{
      const { client_id } = req.body;
      const address = await Address.create({
        client_id,
        ...req.body
      })
      
      return res.json(address);
    }catch(err){
      if(!err.errors)
       return res.status(400).json({ errors: [ err.message ] });
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }
}

module.exports = new AddressController();