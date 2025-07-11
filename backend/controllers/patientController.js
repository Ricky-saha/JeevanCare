
// ========================================
// PATIENT CONTROLLERS - PHASE 1
// ========================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { uploadImage } from "../config/cloudinary.js";
import mongoose from "mongoose";
import prescriptionModel from "../models/prescriptionModel.js";

// ========================================
// 1. PATIENT SIGNUP --> verified
// ========================================
export const patientSignup = async (req, res) => {
  try {
    const { name, email, password, phone, gender, dob, address
     } = req.body;
    const imageFile = req.files?.image;
   
    // Check if patient already exists
    const existingPatient = await patientModel.findOne({ email });
    if (existingPatient) {
      return res.json({ success: false, message: "Patient already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to cloudinary if provided
     const imageUploadResult = await uploadImage(imageFile);

    // Create new patient
    const patient = new patientModel({
      name,
      email,
      password: hashedPassword,
      phone,
      gender: gender || "Not Selected",
      dob: dob || null,
      address: address || { line1: "", line2: "" },
      image: imageUploadResult.url,
      account: "Patient",
    });

    const savedPatient = await patient.save();

    console.log("new patient is-->", savedPatient);
    res.json({
      success: true,
      message: "Patient registered successfully" + savedPatient,
      patientId: savedPatient._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 2. PATIENT LOGIN --> verified
// ========================================
export const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find patient by email
    const patient = await patientModel.findOne({ email });
    if (!patient) {
      return res.json({ success: false, message: "Patient not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: patient._id,
        email: patient.email,
        role: "Patient",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

      res.cookie("token", token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",   
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        image: patient.image,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 3. GET AVAILABLE SLOTS FOR A DOCTOR --> Verified
// ========================================
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    // Check if doctor exists and is available
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor || !doctor.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Generate all time slots (8:00 AM to 8:00 PM, 30-min slots)
    const allSlots = [
      "8:00 am",
      "8:30 am",
      "9:00 am",
      "9:30 am",
      "10:00 am",
      "10:30 am",
      "11:00 am",
      "11:30 am",
      "12:00 pm",
      "12:30 pm",
      "1:00 pm",
      "1:30 pm",
      "2:00 pm",
      "2:30 pm",
      "3:00 pm",
      "3:30 pm",
      "4:00 pm",
      "4:30 pm",
      "5:00 pm",
      "5:30 pm",
      "6:00 pm",
      "6:30 pm",
      "7:00 pm",
      "7:30 pm",
      "8:00 pm",
    ];

    // Get booked slots for this doctor on this date
    const bookedAppointments = await appointmentModel.find({
      doctorId,
      appointmentDate: date,
      status: { $ne: "Cancelled" },
    });

    const bookedSlots = bookedAppointments.map((apt) => apt.timeSlot);

    // Filter available slots
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({
      success: true,
      doctorName: doctor.name,
      date: date,
      totalSlots: allSlots.length,
      availableSlots: availableSlots.length,
      slots: availableSlots,
      fees: doctor.fees,
      address:doctor.address
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 4. BOOK APPOINTMENT SLOT  ---> verified 
// ========================================
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, appointmentDate, timeSlot } = req.body;
    console.log("data hai hummm", appointmentDate);
    
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
    const patientObjectId = new mongoose.Types.ObjectId(patientId);
    
    const MAX_APPOINTMENTS_PER_SLOT = 10;
    
    const existingAppointments = await appointmentModel.find({
      doctorId: doctorObjectId,
      appointmentDate,
      timeSlot,
      status: { $ne: "Cancelled" },
    });
    
    const bookedCount = existingAppointments.length;
    
    if (bookedCount >= MAX_APPOINTMENTS_PER_SLOT) {
      return res.json({
        success: false,
        message: `${MAX_APPOINTMENTS_PER_SLOT}+ people have already booked this slot. Please try another time slot.`,
        bookedCount,
        availableSlots: MAX_APPOINTMENTS_PER_SLOT - bookedCount,
      });
    }
    
    const patientExistingAppointment = existingAppointments.find(
      (appointment) => appointment.patientId.toString() === patientObjectId.toString()
    );
    
    if (patientExistingAppointment) {
      return res.json({
        success: false,
        message: "You already have an appointment booked for this time slot.",
        existingAppointmentId: patientExistingAppointment._id,
      });
    }
    
    const doctor = await doctorModel.findById(doctorObjectId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    
    const appointment = new appointmentModel({
      doctorId: doctorObjectId,
      patientId: patientObjectId,
      appointmentDate,
      timeSlot,
      fees: doctor.fees,
      paymentStatus: "Pending",
      status: "Scheduled",
      slotNumber: bookedCount + 1,
    });
    
    const savedAppointment = await appointment.save();
    
    const remainingSlots = MAX_APPOINTMENTS_PER_SLOT - (bookedCount + 1);
    
    res.json({
      success: true,
      message: "Appointment booked successfully!",
      appointmentId: savedAppointment._id,
      fees: doctor.fees,
      doctorName: doctor.name,
      appointmentDate,
      timeSlot,
      slotNumber: bookedCount + 1,
      remainingSlots,
      totalBooked: bookedCount + 1,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ========================================
// 5. GET PATIENT BOOKING INFO -->verified
// ========================================
export const getPatientBookings = async (req, res) => {
  try {
    const { patientId } = req.params;

    console.log(patientId);
   const appointments = await appointmentModel
      .find({ patientId: new mongoose.Types.ObjectId(patientId) })
      .populate("doctorId", "name speciality image fees address")
      .sort({ appointmentDate: -1, timeSlot: 1 });
    
    console.log("Found appointments:", appointments.length);
    res.json({
      success: true,
      appointments: appointments.map((apt) => ({
        appointmentId: apt._id,
        doctorName: apt.doctorId.name,
        doctorImage: apt.doctorId.image,
        speciality: apt.doctorId.speciality,
        appointmentDate: apt.appointmentDate,
        timeSlot: apt.timeSlot,
        fees: apt.fees,
        paymentStatus: apt.paymentStatus,
        status: apt.status,
        createdAt: apt.createdAt,
      })),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 6. GET PATIENT PROFILE --> verified
// ========================================
export const getPatientProfile = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await patientModel.findById(patientId);
    if (!patient) {
     console.log(patientId)
      return res.json({ success: false, message: "Patient not found" });
    }
    

    res.json({
      success: true,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        dob: patient.dob,
        address: patient.address,
        image: patient.image,
        account: patient.account,
        createdAt: patient.createdAt,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 7. UPDATE PATIENT PROFILE---> verified
// ========================================
export const updatePatientProfile = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const { name, phone, gender, dob, address } = req.body;
    const imageFile = req.files?.image; 

    // Find patient
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.json({ success: false, message: "Patient not found" });
    }

   
    let imageUrl = patient.image; // Keep existing image as default
    if (imageFile) {
      const imageUploadResult = await uploadImage(imageFile);
      if (imageUploadResult.success) {
        imageUrl = imageUploadResult.url;
      }
    }

    
    let dobDate = patient.dob;
    if (dob) {
      dobDate = new Date(dob);
    }

    // Update patient profile
    const updatedPatient = await patientModel
      .findByIdAndUpdate(
        patientId,
        {
          name: name || patient.name,
          phone: phone || patient.phone,
          gender: gender || patient.gender,
          dob: dobDate,
          address: address || patient.address,
          image: imageUrl, // ✅ FIXED: Use processed imageUrl
        },
        { new: true }
      )

    res.json({
      success: true,
      message: "Profile updated successfully",
      patient: {
        id: updatedPatient._id,
        name: updatedPatient.name,
        email: updatedPatient.email,
        phone: updatedPatient.phone,
        gender: updatedPatient.gender,
        dob: updatedPatient.dob,
        address: updatedPatient.address,
        image: updatedPatient.image,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 8. GET LIST OF ALL DOCTORS --> verified
// ========================================

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ available: true });
    
    res.json({
      success: true,
      doctors: doctors.map((doc) => ({
        id: doc._id,
        name: doc.name,
        image: doc.image,
        speciality: doc.speciality,
        degree: doc.degree,
        experience: doc.experience,
        fees: doc.fees,
        available: doc.available,
        address: doc.address,
      }))
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 9. GET Specific DOCTOR DETAILS--> verified , total number of appointment also given
// ========================================
export const getDoctorDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Get recent appointments count for this doctor
    const appointmentsCount = await appointmentModel.countDocuments({
      doctorId,
      status: { $ne: "Cancelled" },
    });

    res.json({
      success: true,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        image: doctor.image,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        about: doctor.about,
        fees: doctor.fees,
        address: doctor.address,
        available: doctor.available,
        totalAppointments: appointmentsCount,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 10. GET the all perscirption of a particular Patient--> verified , total number of PRESCRIPTION also given
// ========================================

export const getPatientPrescriptions = async (req, res) => {
    try {
        const { patientId } = req.params;
        console.log("Received patientId:", patientId);
        console.log("Converting to ObjectId:", new mongoose.Types.ObjectId(patientId));

        const prescriptions = await prescriptionModel.find({
            patientId: new mongoose.Types.ObjectId(patientId)
        })
        .populate('doctorId', 'name speciality image')
        .populate('appointmentId', 'appointmentDate timeSlot')
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: prescriptions.length,
            prescriptions: prescriptions
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ========================================
// 11. GET the  perscirption DETAILS  of a particular Patient--> verified 
// ========================================

export const getPrescriptionDetails = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const prescription = await prescriptionModel.findById(prescriptionId)
            .populate('doctorId', 'name speciality image phone email')
            .populate('appointmentId', 'appointmentDate timeSlot fees');

        if (!prescription) {
            return res.json({ 
                success: false, 
                message: "Prescription not found" 
            });
        }

        res.json({
            success: true,
            prescription: prescription
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};