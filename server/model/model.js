const mongoose= require('mongoose');

var schema =new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phoneNumber: {
        type:String,
        required:true,
        unique:true
    }
})

const EmployeeDB= mongoose.model('employeedb',schema);

module.exports=EmployeeDB;