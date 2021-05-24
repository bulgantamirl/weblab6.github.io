var EmployeeDB =require('../model/model');

//create and save new employee
exports.create=(req, res)=> {
    //validate request 
    if(!req.body) {
        res.status(400).send({message:"Content can't be empty!"});
        return;
    }

    //new employee
    const employee= new EmployeeDB({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    //save employee in DB
    employee
        .save(employee)
        .then(data=> {
           // res.send(data)
           res.redirect('/')
        })
        .catch(err =>{
            res.status(500).send({
            message:err.message ||"Some error occurred"
            });
    });
}

//retrieve and return all users/ retrieve and return a single employee
exports.find=(req, res)=> {
    if(req.query.id) {
        const id = req.query.id;
        
        EmployeeDB.findById(id)
            .then(data=> {
                if(!data) {
                    res.status(404).send({ message: "Employee not found"})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error finding the user"})
            })
    }
    else {
        EmployeeDB.find()
            .then(employee => {
                res.send(employee)
            })
            .catch(err=> {
                res.status(500).send({message: err.message || "Error occurred while finding employee"})
            })
    }
    
}
//update a new identified employee by employee id
exports.update=(req, res)=> {
    if(!req.body){
        return res
            .status(400)
            .send({message: "Forms cannot be empty"})
    }

    const id=req.params.id; 
    EmployeeDB.findByIdAndUpdate(id, req.body,{ useFindAndModify:false})
    .then(data=>{
        if(!data) {
            res.status(404).send({ message: `Cannot Update employee with ${id}. Maybe user not found!`})    
        }else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error Updating employee"})
    })
}

//del an employee with specified user id in the request
exports.delete =(req, res)=> {
    const id=req.params.id;

    EmployeeDB.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete w/ id ${id}`})
            }else{
                res.send({ message: "Employee is deleted."})
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Cannot delete employee w/" +id });
        });
}