const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name must be given"],
        trim: true,
        maxlength:[30, "name should not be greater than 30 character"]
    },
    
    completed:{
        type:String,
        default: false
    }

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task