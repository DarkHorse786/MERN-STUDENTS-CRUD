let express = require('express');
const { dbConnection } = require('./dbConnection');
const { ObjectId } = require('mongodb');
let app = express();
app.use(express.json());
require('dotenv').config();


app.get('/viewStudent', async (req, res) => {
    let myDB= await dbConnection();
    let studentCollection= myDB.collection('student');
    const {name} = req.body;
    let result = await studentCollection.findOne({name});
    if(result)
    {
        resObj={
            status: true,
            message: "Student found",
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
});

app.delete('/deleteStudent/:id', async (req, res) => {
    let myDB= await dbConnection();
    let studentCollection= myDB.collection('student');
    const {id} = req.params;

    let result = await studentCollection.deleteOne({_id:new ObjectId(id)});
    
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
});

app.post('/insertStudent', async (req, res) => {
    let myDB= await dbConnection();
    let studentCollection= myDB.collection('student');

    const {name, age, email} = req.body;
    let newStudent = {name, age, email};
    let Exist = await studentCollection.findOne({name});
    if(Exist)
    {
        resObj={
            status: false,
            message: "Student already exists",
            data: "ok"
        }
        res.send(resObj);
    }
    else if(!name || !age || !email)
    {
        resObj={
            status: false,
            message: "Please provide all fields",
            data: "ok"
        }
        res.send(resObj);
    }
    else
    {
        let result = await studentCollection.insertOne(newStudent);
        resObj={
            status: true,
            message: "Student inserted successfully",
            data: result
        }
        res.send(resObj);
    } 
});

app.put('/updateStudent/:id', async (req, res) => {
    let myDB= await dbConnection();
    let studentCollection= myDB.collection('student');
    const {name,age,email} = req.body;
    console.log(name,age,email)
    const {id} = req.params;
    const obj={}
    if(name!="" && name!=null && name!=undefined)
        obj['name']=name
    if(age!="" && age!=null && age!=undefined)
        obj['age']=age
    if(email!="" && email!=null && email!=undefined)
        obj['email']=email
    let result = await studentCollection.updateOne({_id:new ObjectId(id)},{$set:obj})
    if(result.modifiedCount>0)
    {
        resObj={
            status: true,
            message: "Student updated",
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
});

app.listen("8000");