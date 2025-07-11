import express from "express"
import { addDoctor, adminLogin, adminSignup, deleteDoctorAccount, getPendingDoctors, updateDoctorStatus } from "../controllers/adminController.js"
import { requireAdmin } from "../middlewares/auth.js";



const adminRouter = express.Router()

// Public routes
adminRouter.post('/signup', adminSignup);
adminRouter.post('/login', adminLogin);

// Protected routes
adminRouter.post('/add-doctor', requireAdmin, addDoctor);
adminRouter.get('/pending-doctors', requireAdmin, getPendingDoctors);
adminRouter.put('/doctor-status-change', requireAdmin, updateDoctorStatus);
adminRouter.delete('/delete-doctor/:doctorId', requireAdmin, deleteDoctorAccount);


export default adminRouter