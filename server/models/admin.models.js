const {Schema, model} = require("mongoose");

const AdminSchema = new Schema({
    username:{
        type: String,
        require:true,
        type: String,
    },
    password:{
        type: String,
        require:true,
    }
})

const AdminModel = model("admins", AdminSchema)
module.exports = AdminModel