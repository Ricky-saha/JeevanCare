import mongoose from "mongoose"
import mailSender from "../config/mailSender.js";
import appointmentConfirmationTemplate from "../mail/appointmentConfirmationTemplate.js";

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient', // Your patient schema
        required: true
    },
    appointmentDate: {
        type: String, // "2025-07-08" 
        required: true
    },
    timeSlot: {
        type: String, // "8:00 am"
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled"
    }
}, { timestamps: true });


//  Email Function for Appointment Confirmation
async function sendAppointmentConfirmation(appointmentData) {
  try {
    // Populate patient and doctor details
    const appointment = await mongoose.model('appointment')
      .findById(appointmentData._id)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name email speciality experience address');

      console.log(appointment)
    if (!appointment) {
      console.log("Appointment not found for email sending");
      return;
    }

    const patient = appointment.patientId;
    const doctor = appointment.doctorId;
    console.log(appointment.date)

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
    });
    };

    

    // Email data for template
    const emailData = {
      patientName: patient.name,
      patientEmail: patient.email,
      doctorName: doctor.name,
      doctorImage:doctor.image,
      doctorSpecialty: doctor.speciality,
      doctorExperience: doctor.experience,
      appointmentId: appointment._id.toString().slice(-8).toUpperCase(),
      appointmentDate: formatDate(appointment.appointmentDate),
      appointmentTime: appointment.timeSlot,
      clinicAddress: doctor.address,
      supportEmail: "appointments@jeevancare.com",
      websiteUrl: "https://jeevancare.life",
      fees: appointment.fees,
    };

    console.log(emailData);

    // Send confirmation email to patient
    const patientEmailResponse = await mailSender(
      patient.email,
      "Appointment Confirmation - JeevanCare", 
      appointmentConfirmationTemplate(emailData)
    );

    console.log("Appointment confirmation email sent to patient:", patientEmailResponse);
  } catch (error) {
    console.log("Error sending appointment confirmation email:", error);
  }
}




// POST-SAVE HOOK - To send the Email whenever there is new appoinment in database
appointmentSchema.post("save", async function (doc, next) {
  console.log("New appointment saved to database:", doc._id);
  
  // Only send email for new appointments 
  if (this.isNew) {
    console.log("Sending appointment confirmation email...");
    await sendAppointmentConfirmation(doc);
  }else{
    await sendAppointmentConfirmation(doc);
    console.log(" no it wasnt new ")
  }
  
  next();
});




const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;