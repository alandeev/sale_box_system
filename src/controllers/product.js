const Model = require('../models/Product');

class Product {
  async store(req, res){
    try{
      const { id: created_by } = req.requester;
      await Model.create({ ...req.body, created_by }, {
        fields: ['created_by', 'name', 'description', 'price'],
      })

      res.status(201).json();
    }catch(err){
      if(err.errors){
        return res.status(400).json({ errors: err.errors.map(error => error.message) });
      }
      return res.status(400).json({ errors: [ err.message ] });
    }
  }

  async index(req, res){
    const products = await Model.findAll();

    res.json(products);
  }
}

module.exports = new Product();
