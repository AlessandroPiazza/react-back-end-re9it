const express = require ('express');
const router = express.Router();
const config = require('../config')

var db = require ('../db');
var bcrypt = require ('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    const { email, password } = req.body.userData;

    if( email === undefined || password === undefined ){
        res.status(401).json({
            success: false,
            code: 'API_ERROR_01',
            message: "E-mail and/or password inválid."
        })
    } else {
        //Find User
        const handler = (err ,result)=>{
            if(!err && result && bcrypt.compareSync(password, result.password)){
                let tokenData = {
                    email: result.email
                }
                let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '1m'});
                res.json({
                    success: true,
                    token: generatedToken
                })
            }else{
                res.status(401).json({
                    success: false,
                    code: 'API_ERROR_02',
                    message: "erro"
                })
            }
        }
        db.findUser({email}, handler);

    }

})

router.get('/verifytoken', (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if(!err){
            res.json({
                success: true,
                message: 'Token is valid'
            })
            alert("Token ativo: " + token);
        }else{
            res.status(401).json({
                success: false,
                error: err
            })
        }
    })
})

module.exports = router;