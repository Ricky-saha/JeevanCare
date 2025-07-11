import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    // References
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
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment'
    },
    
    // Prescription Details
    prescriptionId: {
        type: String,
        required: true,
        unique: true
    },
    
    // Medicines Array
    medicines: [{
        name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: true
        },
        frequency: {
            type: String,
            required: true,
            // enum: ["Once daily", "Twice daily", "Three times daily", "Four times daily", "As needed"]
        },
        duration: {
            type: String,
            required: true
        },
        instructions: {
            type: String,
            default: ""
        }
    }],
    
    // Additional Instructions
    generalInstructions: {
        type: String,
        default: ""
    },
    
    // Follow-up
    followUpDate: {
        type: Date
    },
    
    // Status
    status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active"
    }
    
}, { timestamps: true });

const prescriptionModel = mongoose.models.prescription || mongoose.model('prescription', prescriptionSchema);

export default prescriptionModel;