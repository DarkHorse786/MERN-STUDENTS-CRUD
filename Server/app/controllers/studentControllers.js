const { StudentModel } = require("../models/StudentModel");

let insertRecord = (req, res) => {
    
    const {name, age, email,phone,address} = req.body;
    let newStudent = new StudentModel({
        name: name,
        age: age,
        email: email,
        phone: phone,
        address: address
    });

    newStudent.save().then(() =>{
        resObj={
            status: true,
            message: "Student Registered successfully"
        }
        res.send(resObj)
    }).catch((err) => {
        if(err.errorResponse.code==11000)
            message="Email already Exists.."
        resObj={
            status: false,
            message: message,
            ErrorData: err
        }
        res.send(resObj)
    });
}

let getRecords = async (req, res) => {
    
    let result = await StudentModel.find();
    if(result.length>0)
    {
        resObj={
            status: true,
            message: "Students Data found!",
            data: result
        }
        res.send(resObj);
    } 
    else
    {
        resObj={
            status: false,
            message: "No Data Added yet..",
            data: result
        }
        res.send(resObj);
    }
}

let getRecord = async (req, res) => {
    let id = req.params.id;
    let result = await StudentModel.findOne({_id:id});
    res.send({status:1,data:result});
}


let deleteRecord = async (req, res) => {
    
    const {id} = req.params;
    let result = await StudentModel.deleteOne({_id:id});
    
    if(result.deletedCount>0)
    {
        resObj={
            status: true,
            message: "Student deleted successfully",
            data: result
        }
        res.send(resObj);
    } 
    else
    {
        resObj={
            status: false,
            message: "Student not found",
            data: result
        }
        res.send(resObj);
    }
}

let updateRecord = async (req, res) => {
   
    const {name,age,email,phone,address} = req.body;
    
    const {id} = req.params;

    const updatedStudent = {
        name: name,
        age: age,
        email: email,
        phone: phone,
        address: address
    };

    let result = await StudentModel.updateOne({_id:id},{$set:updatedStudent})
    if (result.modifiedCount > 0) 
    {
        res.send({ status: true, message: "Student Record updated", data: result });
    } 
    else 
    {
        res.send({ status: false, message: "Student not found or no changes", data: result });
    }
}
module.exports = {insertRecord, getRecords, deleteRecord, updateRecord,getRecord};