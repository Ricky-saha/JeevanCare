import express from "express"
import { createPrescription, doctorLogin, doctorSignup, getAppointmentDetails, getDoctorAppointments, getDoctorDashboard, getDoctorPrescriptions, getDoctorProfile, getPatientHistory, updateAppointmentStatus, updateAvailability } from "../controllers/doctorController.js"
import { requireDoctor } from "../middlewares/auth.js"


const doctorRouter = express.Router()

// Public routes
doctorRouter.post('/signup', doctorSignup)
doctorRouter.post('/login', doctorLogin)

// Protected routes
doctorRouter.get('/my-profile/:doctorId', requireDoctor, getDoctorProfile);
doctorRouter.put('/change-availability/:doctorId', requireDoctor, updateAvailability);
doctorRouter.get('/my-appointments/:doctorId', requireDoctor, getDoctorAppointments);
doctorRouter.put('/appointment-status/:appointmentId', requireDoctor, updateAppointmentStatus);
doctorRouter.get('/appointment/:appointmentId', requireDoctor, getAppointmentDetails);
doctorRouter.get('/patient-history/:patientId', requireDoctor, getPatientHistory);
doctorRouter.post('/create-prescription', requireDoctor, createPrescription);
doctorRouter.get('/prescriptions/:doctorId', requireDoctor, getDoctorPrescriptions);
doctorRouter.get('/my-dashboard/:doctorId', requireDoctor, getDoctorDashboard);






export default doctorRouter