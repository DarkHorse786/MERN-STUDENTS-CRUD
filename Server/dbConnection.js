const {MongoClient}=require('mongodb');
const url='mongodb://localhost:27017';
const dbName='DATA';
const client=new MongoClient(url);

let dbConnection= async ()=>{
    await client.connect();
    let db=client.db(dbName);
    console.log("Connected to database");
    return db;
}
module.exports={dbConnection};