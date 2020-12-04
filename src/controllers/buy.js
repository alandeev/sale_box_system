const Address = require('../models/Address');
const Buy = require('../models/Buy');
const Client = require('../models/Client');
const Product = require('../models/Product');

class BuyController{
  async findAllProjects(req, res){
    const { client_id } = req.params;

    const buys = await Buy.findOne({
      where: { client_id },
      attributes: ['id', 'is_paid', 'created_at'],
      include: [{
        model: Product,
        as: 'products',
        attributes: ['name', 'description', 'price'],
        include: {
          association: 'profile',
          attributes: ['filename', 'originalname'],
        },
        through: {
          attributes: []
        }
      }, {
        model: Client,
        as: 'client',
        attributes: ['name', 'phone'],
        include: {
          model: Address,
          as: 'address',
          attributes: ['cep', 'city', 'street', 'number']
        }
      }]
    });

    const sub_total = buys.toJSON().products.reduce((previous, current) => previous.price + current.price);

    buys.setDataValue('price_total', sub_total);

    return res.json(buys);
  }

  async findOrCreateAndAddProduct(req, res){
    try{
      const { client_id, product_id } = req.params;

      const client = await Client.findByPk(client_id);
      if(!client){
        return res.status(400).json({ errors: ['client not found'] });
      }

      const [ buy ] = await Buy.findOrCreate({
        where:{ client_id, is_paid: false },
        defaults: { client_id, is_paid: false }
      });

      const product = await Product.findByPk(product_id);

      if(!product){
        return res.status(400).json({ errors: ['product not found'] });
      }

      await buy.addProduct(product);

      return res.json(buy);
    }catch(err){
      if(!err.errors){
        return res.status(400).json({ errors: [ err.message ] });
      }
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }
}

module.exports = new BuyController();
