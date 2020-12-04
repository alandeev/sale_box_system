const Buy = require('../models/Buy');

class BuyController{
  async index(req, res){
    const { client_id } = req.parmas;

    const buys = await Buy.findAll({
      where: { client_id },
      include: {
        association: 'products'
      }
    });

    return res.json(buys);
  }

  async create(req, res){
    try{
      const { client_id } = req.parmas;

      const [ buy, created ] = await Buy.findOrCreate({
        where:{ client_id, is_paid: false },
        defaults: { client_id, is_paid: false }
      });

      return res.json(buy);
    }catch(err){
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }
}

module.exports = new BuyController();
