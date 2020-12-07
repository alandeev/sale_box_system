const Address = require('../models/Address');
const Buy = require('../models/Buy');
const Client = require('../models/Client');
const Product = require('../models/Product');
const Product_Buy = require('../models/Product_Buy');

class BuyController{
  async findAllBuyPaid(req, res){
    const buys = await Buy.findAll({
      where: { is_paid: true },
      attributes: ['id', 'is_paid', 'created_at'],
      include: [{
        model: Product,
        as: 'products',
        attributes: ['name', 'description', 'price'],
        include: {
          association: 'profile',
          attributes: ['filename', 'originalname'],
        },
        // through: {
        //   attributes: []
        // }
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

    return res.json(buys);
  }

  async findBuyClientCurrent(req, res){
    const { client_id } = req.params;

    const buys = await Buy.findOne({
      where: { client_id, is_paid: false },
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
          attributes: ['qtd'],
          as: 'count_product'
        }
      }, {
        model: Client,
        as: 'client',
        attributes: ['name', 'phone', 'id'],
        include: {
          model: Address,
          as: 'address',
          attributes: ['cep', 'city', 'street', 'number']
        }
      }]
    });

    if(!buys){
      return res.status(400).json({ errors: ['buys not found'] });
    }

    return res.json(buys);
  }

  async findOrCreateCartAndAddProduct(req, res){
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

      const [ cart, created ] = await Product_Buy.findOrCreate({
        where: { product_id: product.id, buy_id: buy.id },
        default: { product_id: product.id, buy_id: buy.id, qtd: 1 }
      });

      if(!created){
        await cart.increment('qtd', { by: 1 });
      }

      return res.json(cart);
    }catch(err){
      if(!err.errors){
        return res.status(400).json({ errors: [ err.message ] });
      }
      return res.status(400).json({ errors: err.errors.map(error => error.message) });
    }
  }

  async checkout(req, res){
    const { client_id } = req.params;

    const buys = await Buy.findOne({
      where: { client_id, is_paid: false }
    });

    if(!buys){
      return res.status(400).json({ errors: ['buys not found'] });
    }

    const response = await buys.set_paid(true);
    return res.json(response);
  }
}

module.exports = new BuyController();
