const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database is connected...")
})
.catch((e)=>{
    console.log("Database is not connected...")
})
