"use strict";
var express = require('express');
var router = express.Router();
// var validator = require('../services/validator');
var chickensController = require('../controllers/Chickens');

var service = 'chickens';

// get chickens or search chickens
router.get('/'+service, chickensController.find);

// get chicken
router.get('/'+service+'/:id', chickensController.findOne);

// To add validation, add a middlewave like the below. Works for just POST calls only
// function(req,res,next){
//     req._required = [ // _required should contain all the fails that are required
//     'name',
//     'name2'
//     ];

//     next();
// }, validator,

// create chicken(s) a single chicken object will create one chicken while an array of chickens will create multiple chickens
router.post('/'+service, chickensController.create);

// update all records that matches the query
router.put('/'+service, chickensController.update);

// update a single record
router.patch('/'+service+'/:id', chickensController.updateOne);

// delete all records that matches the query
router.delete('/'+service, chickensController.delete);

// Delete a single record
router.delete('/'+service+'/:id', chickensController.deleteOne);

// restore a previously deleted record
router.post('/'+service+'/:id/restore', chickensController.restore);

module.exports = router;
