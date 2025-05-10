const { mongoose } = require("mongoose");

let studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = {StudentModel};