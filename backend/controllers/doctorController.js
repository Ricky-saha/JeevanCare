// ========================================
// DOCTOR CONTROLLERS - PHASE 1
// ========================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";
import appointmentModel from "../models/appointmentModel.js";
import prescriptionModel from "../models/prescriptionModel.js";
import { uploadImage } from "../config/cloudinary.js";
import mongoose from "mongoose";

// ========================================
// 1. DOCTOR SIGNUP - With Pending Status --->Verified
// ========================================
export const doctorSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      speciality,
      dob,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
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

    // Create new doctor with Pending status
    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      image: imageUrl,
      speciality,
      dob,
      degree,
      experience,
      about: about || "",
      fees,
      address: address,
      available: false, // Not available until verified
      status: "Pending", // Default pending status
      account: "Doctor",
    });

    const savedDoctor = await doctor.save();

    res.json({
      success: true,
      message:
        "Doctor registered successfully! Your account is under review. You'll be notified within 24 hours.",
      doctorId: savedDoctor._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 2. DOCTOR LOGIN - With Status Check -->Verified
// ========================================
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Check verification status
    if (doctor.status === "Pending") {
      return res.json({
        success: false,
        message:
          "Your account is under review. Please wait for 24 hrs for  admin approval.",
      });
    }

    if (doctor.status === "Rejected") {
      return res.json({
        success: false,
        message:
          "Your account was rejected. Please contact support for more details.",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: doctor._id,
        email: doctor.email,
        role: "Doctor",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        image: doctor.image,
        speciality: doctor.speciality,
        status: doctor.status,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 3. GET DOCTOR PROFILE --> verified
// ========================================
export const getDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await doctorModel.findById(doctorId).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Get total appointments count
    const totalAppointments = await appointmentModel.countDocuments({
      doctorId,
      status: { $ne: "Cancelled" },
    });

    // Get total prescriptions count
    const totalPrescriptions = await prescriptionModel.countDocuments({
      doctorId,
    });

    res.json({
      success: true,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        image: doctor.image,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        about: doctor.about,
        fees: doctor.fees,
        dob: doctor.dob,
        address: doctor.address,
        available: doctor.available,
        status: doctor.status,
        totalAppointments,
        totalPrescriptions,
        createdAt: doctor.createdAt,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 4. UPDATE AVAILABILITY STATUS --> Verified
// ========================================
export const updateAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { available } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Only verified doctors can change availability
    if (doctor.status !== "Verified") {
      return res.json({
        success: false,
        message: "Only verified doctors can update availability",
      });
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { available: available },
      { new: true }
    );

    res.json({
      success: true,
      message: `Availability updated to ${
        available ? "Available" : "Unavailable"
      }`,
      available: updatedDoctor.available,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 5. GET DOCTOR APPOINTMENTS--> verified
// ========================================
export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { filter } = req.query; // today, upcoming, past, all

    let dateFilter = {};
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    switch (filter) {
      case "today":
        dateFilter = { appointmentDate: today };
        break;
      case "upcoming":
        dateFilter = { appointmentDate: { $gt: today } };
        break;
      case "past":
        dateFilter = { appointmentDate: { $lt: today } };
        break;
      default:
        dateFilter = {}; // all appointments
    }

    const appointments = await appointmentModel
      .find({
        doctorId: new mongoose.Types.ObjectId(doctorId),
        ...dateFilter,
      })
      .populate("patientId", "name phone gender age image")
      .sort({ appointmentDate: -1, timeSlot: 1 });

    res.json({
      success: true,
      filter: filter || "all",
      count: appointments.length,
      appointments: appointments.map((apt) => ({
        appointmentId: apt._id,
        patientName: apt.patientId.name,
        patientPhone: apt.patientId.phone,
        patientImage: apt.patientId.image,
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
// 6. UPDATE APPOINTMENT STATUS --> verified
// ========================================
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, doctorId } = req.body;

    // Debug logs
    console.log("Received appointmentId:", appointmentId);
    console.log("Received status:", status);
    console.log("Received doctorId:", doctorId);
    console.log("Type of doctorId:", typeof doctorId);


    if (!["Completed", "Cancelled"].includes(status)) {
      return res.json({
        success: false,
        message: "Invalid status. Use 'Completed' or 'Cancelled'",
      });
    }

    // First find the appointment and check if it belongs to this doctor
    const existingAppointment = await appointmentModel.findById(appointmentId);

    if (!existingAppointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // More debug logs
    console.log("Found appointment doctorId:", existingAppointment.doctorId);
    console.log(
      "Type of appointment doctorId:",
      typeof existingAppointment.doctorId
    );

    // Try string comparison first
    console.log(
      "String comparison:",
      existingAppointment.doctorId.toString(),
      "vs",
      doctorId
    );
    console.log(
      "Are they equal (string):",
      existingAppointment.doctorId.toString() === doctorId
    );

    // Simple string comparison
    if (existingAppointment.doctorId.toString() !== doctorId) {
      return res.json({
        success: false,
        message: "You can only update your own appointments",
      });
    }

    // Update the appointment
    const appointment = await appointmentModel
      .findByIdAndUpdate(appointmentId, { status }, { new: true })
      .populate("patientId", "name");


      // In your backend, right before res.json()
console.log("About to send response:", {
  success: true,
  message: `Appointment ${status.toLowerCase()} successfully`,
  // ... other data
});



    res.json({
      success: true,
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment: {
        appointmentId: appointment._id,
        patientName: appointment.patientId.name,
        appointmentDate: appointment.appointmentDate,
        timeSlot: appointment.timeSlot,
        status: appointment.status,
      },
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
// ========================================
// 7. GET APPOINTMENT DETAILS ---> verified
// ========================================
export const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate("patientId", "name phone email gender dob address image")
      .populate("doctorId", "name speciality");

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Check if prescription exists for this appointment
    const prescription = await prescriptionModel.findOne({
      appointmentId: appointmentId,
    });

    res.json({
      success: true,
      appointment: {
        appointmentId: appointment._id,
        appointmentDate: appointment.appointmentDate,
        timeSlot: appointment.timeSlot,
        fees: appointment.fees,
        paymentStatus: appointment.paymentStatus,
        status: appointment.status,
        patient: {
          id: appointment.patientId._id,
          name: appointment.patientId.name,
          phone: appointment.patientId.phone,
          email: appointment.patientId.email,
          gender: appointment.patientId.gender,
          dob: appointment.patientId.dob,
          address: appointment.patientId.address,
          image: appointment.patientId.image,
        },
        doctor: {
          name: appointment.doctorId.name,
          speciality: appointment.doctorId.speciality,
        },
        hasPrescription: !!prescription,
        prescriptionId: prescription?._id || null,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 8. GET PATIENT HISTORY --> verified
// ========================================
export const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { doctorId } = req.query; // Optional: filter by doctor

    let filter = { patientId: new mongoose.Types.ObjectId(patientId) };
    if (doctorId) {
      filter.doctorId = new mongoose.Types.ObjectId(doctorId);
    }

    // Get appointments
    const appointments = await appointmentModel
      .find(filter)
      .populate("doctorId", "name speciality")
      .sort({ appointmentDate: -1 });

    // Get prescriptions
    const prescriptions = await prescriptionModel
      .find(filter)
      .populate("doctorId", "name speciality")
      .sort({ createdAt: -1 });

    // Get patient details
    const patient = await patientModel
      .findById(patientId)
      .select("name phone email gender dob image");

    res.json({
      success: true,
      patient: patient,
      appointmentsCount: appointments.length,
      prescriptionsCount: prescriptions.length,
      appointments: appointments,
      prescriptions: prescriptions,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 9. CREATE PRESCRIPTION ---> verified
// ========================================
export const createPrescription = async (req, res) => {
  console.log('=== CREATE PRESCRIPTION API DEBUG ===')
  console.log('Request method:', req.method)
  console.log('Request headers:', req.headers)
  console.log('Request body:', JSON.stringify(req.body, null, 2))
  console.log('Request params:', req.params)
  console.log('Request query:', req.query)
  
  try {
    const { doctorId, patientId, appointmentId, medicines, generalInstructions, followUpDate } = req.body
    
    console.log('Extracted data:', {
      doctorId,
      patientId,
      appointmentId,
      medicines,
      generalInstructions,
      followUpDate
    })
    
    // Validate required fields
    if (!doctorId || !patientId || !appointmentId || !medicines || medicines.length === 0) {
      console.error('Missing required fields')
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }
    
    // Validate medicines array
    const invalidMedicine = medicines.find(med => 
      !med.name || !med.dosage || !med.frequency || !med.duration
    )
    
    if (invalidMedicine) {
      console.error('Invalid medicine data:', invalidMedicine)
      return res.status(400).json({
        success: false,
        message: 'All medicine fields are required'
      })
    }
    
    // Generate prescription ID
    const prescriptionCount = await prescriptionModel.countDocuments()
    const prescriptionId = `JC-${new Date().getFullYear()}-${String(prescriptionCount + 1).padStart(3, '0')}`
    
    console.log('Generated prescription ID:', prescriptionId)
    
    // Create prescription object
    const prescriptionData = {
      doctorId: new mongoose.Types.ObjectId(doctorId),
      patientId: new mongoose.Types.ObjectId(patientId),
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
      prescriptionId,
      medicines,
      generalInstructions,
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      status: 'Active'
    }
    
    console.log('Prescription data to save:', prescriptionData)
    
    // Save prescription
    const prescription = new prescriptionModel(prescriptionData)
    const savedPrescription = await prescription.save()
    
    console.log('Saved prescription:', savedPrescription)
    
    res.json({
      success: true,
      message: 'Prescription created successfully',
      data: savedPrescription
    })
    
  } catch (error) {
    console.error('=== CREATE PRESCRIPTION ERROR ===')
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create prescription'
    })
  }
}

// ========================================
// 10. GET DOCTOR PRESCRIPTIONS --> verified
// ========================================
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { status, limit } = req.query;

    let filter = { doctorId: new mongoose.Types.ObjectId(doctorId) };
    if (status) {
      filter.status = status;
    }

    const prescriptions = await prescriptionModel
      .find(filter)
      .populate("patientId", "name phone gender image")
      .populate("appointmentId", "appointmentDate timeSlot")
      .sort({ createdAt: -1 })
      .limit(limit ? parseInt(limit) : 0);

    res.json({
      success: true,
      count: prescriptions.length,
      prescriptions: prescriptions.map((prescription) => ({
        prescriptionId: prescription._id,
        prescriptionNumber: prescription.prescriptionId,
        patientName: prescription.patientId.name,
        patientPhone: prescription.patientId.phone,
        appointmentDate: prescription.appointmentId.appointmentDate,
        timeSlot: prescription.appointmentId.timeSlot,
        medicinesCount: prescription.medicines.length,
        status: prescription.status,
        createdAt: prescription.createdAt,
      })),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================================
// 11. GET DOCTOR DASHBOARD --> verified
// ========================================
export const getDoctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const today = new Date().toISOString().split("T")[0];

    // Today's appointments
    const todayAppointments = await appointmentModel.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      appointmentDate: today,
      status: { $ne: "Cancelled" },
    });

    // Total appointments
    const totalAppointments = await appointmentModel.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: { $ne: "Cancelled" },
    });

    // Total prescriptions
    const totalPrescriptions = await prescriptionModel.countDocuments({
      doctorId: new mongoose.Types.ObjectId(doctorId),
    });

    // Total earnings (sum of fees from completed appointments)
    const earningsResult = await appointmentModel.aggregate([
      {
        $match: {
          doctorId: new mongoose.Types.ObjectId(doctorId),
          status: "Completed",
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$fees" },
        },
      },
    ]);

    const totalEarnings =
      earningsResult.length > 0 ? earningsResult[0].totalEarnings : 0;

    // Recent appointments (last 5)
    const recentAppointments = await appointmentModel
      .find({
        doctorId: new mongoose.Types.ObjectId(doctorId),
      })
      .populate("patientId", "name image")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get doctor status
    const doctor = await doctorModel
      .findById(doctorId)
      .select("available status");

    res.json({
      success: true,
      dashboard: {
        doctorStatus: {
          available: doctor.available,
          verificationStatus: doctor.status,
        },
        stats: {
          todayAppointments,
          totalAppointments,
          totalPrescriptions,
          totalEarnings,
        },
        recentAppointments: recentAppointments.map((apt) => ({
          appointmentId: apt._id,
          patientName: apt.patientId.name,
          patientImage: apt.patientId.image,
          appointmentDate: apt.appointmentDate,
          timeSlot: apt.timeSlot,
          status: apt.status,
        })),
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
