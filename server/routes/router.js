const express=require('express');
const route= express.Router();

const controller =require('../controller/controller');
const axios =require('axios');

route.get('/', (req, res) => {
    axios.get('http://localhost:5000/api/employees')
    .then(function(response){
        res.render('index',{employees: response.data });
    })
    .catch(err=>{
        res.send(err);
    })
})

route.get('/add_employee', (req, res) => {
    res.render('add_employee');
})

route.get('/update_employee', (req, res) => {
    axios.get('http://localhost:5000/api/employees', {params: { id:req.query.id}})
    .then(function(employeedata){
        res.render("update_employee",{ employee:employeedata.data})
    })
    .catch(err=> {
        res.send(err);
    })
})
//API
route.post('/api/employees',controller.create);
route.get('/api/employees',controller.find);
route.put('/api/employees/:id',controller.update);
route.delete('/api/employees/:id',controller.delete);

module.exports= route