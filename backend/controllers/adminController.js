// ===============================doctorId=========
// ADMIN CONTROLLERS - PHASE 1
// ========================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";
import { uploadImage } from "../config/cloudinary.js";
import mongoose from "mongoose";

// ========================================
// 1. ADMIN SIGNUP --> verified
// ========================================
export const adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const imageFile = req.files?.image;

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        // Validate required image
        if (!imageFile) {
            return res.json({ success: false, message: "Admin image is required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload image to cloudinary
        const imageUploadResult = await uploadImage(imageFile);
        if (!imageUploadResult.success) {
            return res.json({ success: false, message: "Failed to upload image" });
        }

        // Create new admin
        const admin = new adminModel({
            name,
            email,
            password: hashedPassword,
            image: imageUploadResult.url,
            account: "Admin"
        });

        const savedAdmin = await admin.save();

        res.json({
            success: true,
            message: "Admin registered successfully",
            adminId: savedAdmin._id
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 2. ADMIN LOGIN  --> verified
// ========================================
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: admin._id,
                email: admin.email,
                role: "Admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                image: admin.image
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 3. ADD DOCTOR (Manual Addition by Admin) --> verified
// ========================================
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password, dob, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.files?.image;

        // Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({ success: false, message: "Doctor already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload image to cloudinary if provided
        let imageUrl = "";
        if (imageFile) {
            const imageUploadResult = await uploadImage(imageFile);
            imageUrl = imageUploadResult.url;
        }

        // Create new doctor with Verified status (since admin is adding)
        const doctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            dob,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about: about || "",
            fees,
            address: address || { line1: "", line2: "" },
            available: true, // Available since admin verified
            status: "Verified", // Auto-verified since admin added
            account: "Doctor"
        });

        const savedDoctor = await doctor.save();

        res.json({
            success: true,
            message: "Doctor added successfully",
            doctorId: savedDoctor._id,
            doctorName: savedDoctor.name
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 4. GET PENDING DOCTORS ---> verified
// ========================================
export const getPendingDoctors = async (req, res) => {
    try {
        const pendingDoctors = await doctorModel.find({ 
            status: "Pending" 
        }).select("-password").sort({ createdAt: -1 });

        res.json({
            success: true,
            count: pendingDoctors.length,
            doctors: pendingDoctors.map(doctor => ({
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                dob:doctor.dob,
                available:doctor.available,
                image: doctor.image,
                speciality: doctor.speciality,
                degree: doctor.degree,
                experience: doctor.experience,
                about: doctor.about,
                fees: doctor.fees,
                address: doctor.address,
                status: doctor.status,
                createdAt: doctor.createdAt
            }))
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 5. UPDATE DOCTOR STATUS (Approve/Reject)--> verified 
// ========================================
export const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        console.log(status)

        // ✅ Convert doctorId string to ObjectId
        const doctorObjectId = new mongoose.Types.ObjectId(doctorId);

        // ✅ Validate status - include all 3 statuses
        if (!["Verified", "Rejected"].includes(status)) {
            return res.json({
                success: false,
                message: "Invalid status. Use 'Pending', 'Verified' or 'Rejected'"
            });
        }

        // Find and update doctor using ObjectId
        const doctor = await doctorModel.findById(doctorObjectId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Update doctor status
        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            doctorObjectId,
            { 
                status: status,
                available: status === "Verified" ? true : false // Make available only if verified
            },
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            message: `Doctor ${status.toLowerCase()} successfully`,
            doctor: {
                id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                speciality: updatedDoctor.speciality,
                status: updatedDoctor.status,
                available: updatedDoctor.available
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 6. DELETE DOCTOR ACCOUNT --> verified
// ========================================
export const deleteDoctorAccount = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Find doctor
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Check if doctor has any active appointments
        const appointmentModel = (await import("../models/appointmentModel.js")).default;
        const activeAppointments = await appointmentModel.countDocuments({
            doctorId: new mongoose.Types.ObjectId(doctorId),
            status: { $in: ["Scheduled", "Completed"] }
        });

        if (activeAppointments > 0) {
            return res.json({
                success: false,
                message: `Cannot delete doctor. ${activeAppointments} appointments found. Please handle appointments first.`
            });
        }

        // Delete doctor
        await doctorModel.findByIdAndDelete(doctorId);

        res.json({
            success: true,
            message: `Doctor ${doctor.name} deleted successfully`
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};