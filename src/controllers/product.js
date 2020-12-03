const Model = require('../models/Product');
const Photo = require('../models/Photo');

const fs = require('fs');

const cfg = require('../configs/multer');
const multer = require('multer');

const upload = multer(cfg).single('file');

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
    const products = await Model.findAll({
      include: {
        model: Photo,
        as: 'profile',
        attributes: ['filename', 'originalname', 'created_at']
      },
      attributes: ['name', 'description', 'price', 'created_at', 'id']
    });

    return res.json(products);
  }

  async upload(req, res){
    const { product_id } = req.params;

    const product = await Model.findByPk(product_id);
    if(!product){
      return res.status(400).json({ error: "Product not found" });
    }

    upload(req, res, async (err) => {
      if(err){
        return res.status(400).json({ error: err.code })
      }

      const { originalname, filename, path } = req.file

      const [ photo, created ] = await Photo.findOrCreate({
        where: { product_id },
        defaults: { originalname, filename, path,  product_id },
        fields: ['product_id', 'originalname', 'filename', 'path']
      })

      if(!created){
        fs.unlink(photo.path, () => {});
        await photo.update({ originalname, filename, path }, {
          fields: ['originalname', 'filename', 'path']
        });
      }

      return res.json(photo);
    });
  }
}

module.exports = new Product();
