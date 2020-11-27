const express = require('express');
const cors = require('cors');

//stating database
require('./database/database');

class App{
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(){
    this.app.use('/', require('./routers/auth'));
    this.app.use('/users', require('./routers/user'));
    this.app.get('/oauth', require('./middleware'), (req, res) => res.json(req.requester));
  }
}

module.exports = new App().app;