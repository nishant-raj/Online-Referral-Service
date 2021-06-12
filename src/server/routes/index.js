const express = require('express');
const router = express.Router();
const model = require('../models/index')

router.post('/register', function(req,res){
    model.inserDetail({email: req.body.email, password: req.body.password, ref_id: req.body.ref_id},function(response){
        res.send(response);
    });
});

router.post('/login', function(req,res){
    model.validateUser({email: req.body.email, password: req.body.password}, function(response){
        res.send(response);
    });
});

router.get('/user_detail', function(req,res){
    model.getData({id: req.query.id},function(response){
        res.send(response);
    });
});

router.post('/remove',function(req,res){
    model.removeUser({email: req.body.email, password: req.body.password},function(response){
        res.send(response);
    });
});


module.exports = router;