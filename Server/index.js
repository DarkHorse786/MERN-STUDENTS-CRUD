let express = require('express');
const mongoose = require('mongoose');
const { studentRoutes } = require('./app/routes/studentRoutes');
let app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

app.use("/web/api/students",studentRoutes); 


