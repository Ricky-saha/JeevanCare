import crypto from "crypto";
import mongoose from "mongoose";
import appointmentModel from "../models/appointmentModel.js";
import { instance } from "../config/razorpay.js";

// ========================================
// 1. CAPTURE PAYMENT - Initiate Razorpay Order
// ========================================
export const capturePayment = async (req, res) => {
    try {
        const { appointments } = req.body; // Frontend sends appointments array
        const userId = req.user?.userId || req.user?.id || req.user?._id; // User ID from authenticated middleware

        console.log("Received appointments:", appointments);
        console.log("User ID:", userId);
        console.log("Full req.user:", req.user);

        // Validation for user authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated. Please login again."
            });
        }

        // Validation for appointments
        if (!appointments || appointments.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide Appointment IDs"
            });
        }

        let totalAmount = 0;
        const validAppointments = [];

        // Validate each appointment
        for (const appointmentId of appointments) {
            console.log("Processing Appointment ID:", appointmentId);
            
            try {
                const appointment = await appointmentModel.findById(appointmentId)
                    .populate('patientId', 'name email phone') // Only populate required fields
                    .populate('doctorId', 'name speciality');

                if (!appointment) {
                    return res.status(400).json({
                        success: false,
                        message: `Could not find appointment with ID: ${appointmentId}`
                    });
                }

                console.log("Found appointment:", {
                    appointmentId: appointment._id,
                    patientId: appointment.patientId?._id,
                    userId: userId
                });

                // Check if user is the patient for this appointment
                // Handle both string and ObjectId comparisons safely
                const appointmentPatientId = appointment.patientId?._id?.toString();
                const currentUserId = userId?.toString();
                
                if (!appointmentPatientId || !currentUserId || appointmentPatientId !== currentUserId) {
                    return res.status(403).json({
                        success: false,
                        message: "You are not authorized for this appointment",
                        debug: {
                            appointmentPatientId,
                            currentUserId,
                            patientIdExists: !!appointment.patientId?._id,
                            userIdExists: !!userId
                        }
                    });
                }

                // Check if payment is already done
                if (appointment.paymentStatus === "Paid") {
                    return res.status(400).json({
                        success: false,
                        message: "Payment already completed for this appointment"
                    });
                }

                // Check if appointment is still valid (not cancelled)
                if (appointment.status === "Cancelled") {
                    return res.status(400).json({
                        success: false,
                        message: "Cannot make payment for cancelled appointment"
                    });
                }

                validAppointments.push(appointment);
                totalAmount += appointment.fees;

            } catch (error) {
                console.log("Error processing appointment:", error);
                return res.status(500).json({
                    success: false,
                    message: `Error processing appointment ${appointmentId}: ${error.message}`
                });
            }
        }

        // Create Razorpay order
        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
            receipt: `appointment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            notes: {
                appointmentIds: appointments.join(','),
                patientId: userId,
                totalAppointments: appointments.length
            }
        };

        try {
            const paymentResponse = await instance.orders.create(options);
            
            console.log("Razorpay order created:", paymentResponse.id);
            
            res.json({
                success: true,
                message: "Payment order created successfully",
                data: {
                    orderId: paymentResponse.id,
                    amount: totalAmount,
                    currency: paymentResponse.currency,
                    appointmentDetails: validAppointments.map(apt => ({
                        appointmentId: apt._id,
                        doctorName: apt.doctorId.name,
                        doctorSpeciality: apt.doctorId.speciality,
                        appointmentDate: apt.appointmentDate,
                        timeSlot: apt.timeSlot,
                        fees: apt.fees
                    }))
                }
            });

        } catch (error) {
            console.log("Razorpay order creation failed:", error);
            return res.status(500).json({
                success: false,
                message: "Could not initiate payment order",
                error: error.message
            });
        }

    } catch (error) {
        console.log("Error in capturePayment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// ========================================
// 2. SEND PAYMENT KEY - Send Razorpay Key to Frontend
// ========================================
export const sendRazorpayKey = async (req, res) => {
    try {
        if (!process.env.RAZORPAY_KEY) {
            return res.status(500).json({
                success: false,
                message: "Razorpay key not configured"
            });
        }

        res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY,
            message: "Razorpay key fetched successfully"
        });
    } catch (error) {
        console.log("Error in sendRazorpayKey:", error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch payment configuration"
        });
    }
};

// ========================================
// 3. VERIFY PAYMENT - Verify Razorpay Payment
// ========================================
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            appointments
        } = req.body;
        
        const userId = req.user?.userId || req.user?.id || req.user?._id;

        console.log("Verifying payment:", {
            razorpay_order_id,
            razorpay_payment_id,
            appointments,
            userId
        });

        // Validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !appointments || !userId) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed - Missing required parameters"
            });
        }

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            console.log("Payment signature verified successfully");
            
            // Update payment status for appointments
            const updateResult = await updatePaymentStatus(appointments, userId);
            
            if (updateResult.success) {
                return res.status(200).json({
                    success: true,
                    message: "Payment verified and appointment status updated successfully",
                    data: {
                        paymentId: razorpay_payment_id,
                        orderId: razorpay_order_id,
                        updatedAppointments: updateResult.updatedCount
                    }
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Payment verified but failed to update appointment status"
                });
            }
        } else {
            console.log("Payment signature verification failed");
            return res.status(400).json({
                success: false,
                message: "Payment verification failed - Invalid signature"
            });
        }

    } catch (error) {
        console.log("Error in verifyPayment:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed due to server error",
            error: error.message
        });
    }
};

// ========================================
// UTILITY FUNCTION - Update Payment Status
// ========================================
const updatePaymentStatus = async (appointmentIds, userId) => {
    try {
        console.log("Updating payment status for appointments:", appointmentIds);
        
        // Verify appointments belong to the user before updating
        const appointmentsToUpdate = await appointmentModel.find({
            _id: { $in: appointmentIds },
            patientId: userId
        });

        if (appointmentsToUpdate.length !== appointmentIds.length) {
            console.log("Some appointments don't belong to the user");
            return {
                success: false,
                message: "Unauthorized appointments found"
            };
        }

        // Update all appointments to paid status
        const updatedAppointments = await appointmentModel.updateMany(
            { 
                _id: { $in: appointmentIds },
                patientId: userId 
            },
            { 
                paymentStatus: "Paid",
                updatedAt: new Date()
            }
        );

        console.log("Payment status updated:", updatedAppointments.modifiedCount, "appointments");
        
        // Send payment confirmation emails (optional)
        for (const appointmentId of appointmentIds) {
            try {
                await sendPaymentConfirmationEmail(appointmentId);
            } catch (emailError) {
                console.log("Failed to send confirmation email for appointment:", appointmentId);
            }
        }
        
        return {
            success: true,
            updatedCount: updatedAppointments.modifiedCount
        };
    } catch (error) {
        console.log("Error updating payment status:", error);
        return {
            success: false,
            message: "Could not update payment status",
            error: error.message
        };
    }
};

// ========================================
// UTILITY FUNCTION - Send Payment Confirmation Email
// ========================================
const sendPaymentConfirmationEmail = async (appointmentId) => {
    try {
        const appointment = await appointmentModel
            .findById(appointmentId)
            .populate('patientId', 'name email')
            .populate('doctorId', 'name speciality');

        if (!appointment) {
            console.log("Appointment not found for payment confirmation email");
            return;
        }

        const patient = appointment.patientId;
        const doctor = appointment.doctorId;

        // Simple email template for payment confirmation
        const emailContent = `
            <h2>Payment Confirmation - JeevanCare</h2>
            <p>Dear ${patient.name},</p>
            <p>Your payment has been successfully processed for the following appointment:</p>
            <ul>
                <li><strong>Doctor:</strong> ${doctor.name}</li>
                <li><strong>Speciality:</strong> ${doctor.speciality}</li>
                <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
                <li><strong>Time:</strong> ${appointment.timeSlot}</li>
                <li><strong>Fees:</strong> ₹${appointment.fees}</li>
            </ul>
            <p>You can now join the video consultation at your scheduled time.</p>
            <p>Thank you for choosing JeevanCare!</p>
        `;

        // Uncomment when you have mail service setup
        // await mailSender(
        //     patient.email,
        //     "Payment Confirmation - JeevanCare",
        //     emailContent
        // );

        console.log("Payment confirmation email would be sent to:", patient.email);
    } catch (error) {
        console.log("Error sending payment confirmation email:", error);
    }
};