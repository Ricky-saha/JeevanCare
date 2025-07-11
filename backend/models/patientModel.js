import mongoose from"mongoose"


const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        default:"Not Selected"
    },
    dob:{
        type:Date,
        default:"Not Selected"
    },
    phone:{
        type:Number,
        default:12345678910
    },
    account:{
        type:String,
        default:"Patient",
        immutable: true
    }
}, { timestamps: true })

const userModel =  mongoose.model('patient',patientSchema)

export default userModel