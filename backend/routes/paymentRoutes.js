import express from "express"
import { requirePatient } from "../middlewares/auth.js"
import { capturePayment, sendRazorpayKey, verifyPayment } from "../controllers/Payments.js";




const paymentRouter = express.Router()


// Protected routes
paymentRouter.post("/capture-payment",requirePatient, capturePayment);
paymentRouter.get("/get-razorpay-key",requirePatient, sendRazorpayKey)
paymentRouter.post("/verify-payment",requirePatient,  verifyPayment);



export default paymentRouter