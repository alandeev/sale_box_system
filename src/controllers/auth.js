const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

class AuthController {
  async authenticate(req, res){
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ errors: ['Do you need send username'] });
    }

    if (!password) {
      return res.status(400).json({ errors: ['Do you need send Password'] });
    }

    const findUserByUsername = await User.findOne({ 
      where: { username }
    });

    if(!findUserByUsername){
      return res.status(401).send({ error: 'username or password is invalid' });
    }

    if(!(await findUserByUsername.password_is_valid(password))){
      return res.status(401).send({ error: 'username or password is invalid' });
    }

    const token = jwt.sign({ user_id: findUserByUsername.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return res.json({ token: `Bearer ${token}` });
    
  }

  async signup(req, res){
    const { name, username, password } = req.body;
    try{
      const user = await User.create({ name, username, password });

      return res.status(201).json(user);
    }catch(err){
      if(err.errors){
        return res.status(400).json({ errors: err.errors.map(error => error.message) });
      }
      return res.status(400).json({ errros: [ err.message ] });
    }
  }
}

module.exports = new AuthController();