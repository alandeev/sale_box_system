const express = require('express');
const cors = require('cors');
const consign = require('consign');

//stating database
require('./database/database');

class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
    consign().include('./src/routers/').into(this.app);
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(){
    this.app.get('/oauth', require('./middleware'), (req, res) => res.json(req.requester));
  }
}

module.exports = new App().app;