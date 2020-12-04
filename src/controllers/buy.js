const Buy = require('../models/Buy');

class BuyController{
  async index(req, res){
    const buys = await Buy.findAll({
      include: {
        association: 'products'
      }
    });
    return res.json(buys);
  }

  async create(req, res){
    try{
      const buy = await Buy.create();

      return res.json(buy);
    }catch(err){
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }
}

module.exports = new BuyController();
