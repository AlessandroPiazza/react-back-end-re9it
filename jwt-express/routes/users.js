var express = require('express');
var router = express.Router();
var db = require('../db');

const config = require ('../config');

const bcrypt = require ('bcrypt');


/* GET users listing. */
router.post('/register', function(req, res, next) {
  const { email, password } = req.body.userData;

  const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);

  const dataToInsert = {
    email,
    password: hash
  }
  const handler = () =>{
    if(!err){
      res.json({
        success: true,
        message: 'User registered.',
        data: result
      });
    }else{
      res.json({
        success: false,
        message: 'User not registered.',
        err: err
      });
    }
  }
  db.register(dataToInsert, handler);

  res.json(dataToInsert);

});

module.exports = router;
