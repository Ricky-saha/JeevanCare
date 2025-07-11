import express from "express"
import cors from "cors"
import"dotenv/config"
import mongoose from "mongoose"
import {connectCloudinary} from "./config/cloudinary.js"
import patientRouter from "./routes/patientRoutes.js"
import fileUpload from "express-fileupload";
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoutes.js"
import paymentRouter from "./routes/paymentRoutes.js"
// import adminRouter from "./routes/adminRoutes.js"

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: "*", // Allow all origins TEMPORARILY
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
)


app.use((req,res,next)=>{
    console.log("app level middleware");
    next();
})

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);

// database connection
mongoose.connect(process.env.URL)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// cloudinary Connection
connectCloudinary()

app.get('/',(req,res)=>{
    res.send("ROOT LEVEL API")
})

 // api endpoints

 app.use('/api/patient',patientRouter)
 app.use('/api/doctor',doctorRouter)
 app.use('/api/admin',adminRouter)
 app.use('/api/payment',paymentRouter)

app.listen(port,()=>{
    console.log(`Server is up at ${port}`)
})