import express from "express"
import { bookAppointment, getAllDoctors, getAvailableSlots, getDoctorDetails, getPatientBookings, getPatientPrescriptions, getPatientProfile, getPrescriptionDetails, patientLogin, patientSignup, updatePatientProfile } from "../controllers/patientController.js"
import { requirePatient } from "../middlewares/auth.js"


const patientRouter = express.Router()

// ---------------Public Routes----------
patientRouter.post('/signup', patientSignup)
patientRouter.post('/login', patientLogin)
patientRouter.get('/get-available-slots/:doctorId/:date', getAvailableSlots)
patientRouter.get('/get-doctors', getAllDoctors)
patientRouter.get('/doctor-profile/:doctorId', getDoctorDetails)


// -------Protected Routes---------
patientRouter.post('/book-appointment',requirePatient, bookAppointment)
patientRouter.get('/my-booking/:patientId', requirePatient,getPatientBookings)
patientRouter.get('/my-profile/:patientId',requirePatient,getPatientProfile)
patientRouter.put('/update-profile/:patientId', requirePatient,updatePatientProfile)
patientRouter.get('/my-prescriptions/:patientId',requirePatient, getPatientPrescriptions)
patientRouter.get('/prescription/:prescriptionId',requirePatient, getPrescriptionDetails)

export default patientRouter