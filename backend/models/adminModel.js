import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    account:{
        type:String,
        default:"Admin",
        immutable: true
    }
},{ timestamps: true })


const adminModel = mongoose.models.admin || mongoose.model('admin',adminSchema)

export default adminModel;