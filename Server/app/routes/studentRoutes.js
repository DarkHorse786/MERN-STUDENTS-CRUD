const express = require('express');
const { insertRecord, getRecords, deleteRecord, updateRecord,getRecord } = require('../controllers/studentControllers');
let studentRoutes = express.Router();

studentRoutes.post('/insertRecord', insertRecord);
studentRoutes.get('/getRecords', getRecords);
studentRoutes.delete('/deleteRecord/:id',deleteRecord);
studentRoutes.put('/updateRecord/:id',updateRecord);
studentRoutes.get('/getRecord/:id',getRecord);

module.exports = {studentRoutes};