// services/apis.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ========================================
// AUTH ENDPOINTS
// ========================================
export const authEndpoints = {
  // Patient Auth
  PATIENT_SIGNUP: BASE_URL + "/patient/signup",
  PATIENT_LOGIN: BASE_URL + "/patient/login",
  
  // Doctor Auth  
  DOCTOR_SIGNUP: BASE_URL + "/doctor/signup",
  DOCTOR_LOGIN: BASE_URL + "/doctor/login",
  
  // Admin Auth
  ADMIN_SIGNUP: BASE_URL + "/admin/signup", 
  ADMIN_LOGIN: BASE_URL + "/admin/login"
};

// ========================================
// PATIENT ENDPOINTS
// ========================================
export const patientEndpoints = {
  // Profile
  GET_PATIENT_PROFILE: BASE_URL + "/patient/my-profile/:patientId",
  UPDATE_PATIENT_PROFILE: BASE_URL + "/patient/update-profile/:patientId",
  
  // Doctors
  GET_ALL_DOCTORS: BASE_URL + "/patient/get-doctors",
  GET_DOCTOR_PROFILE: BASE_URL + "/patient/doctor-profile/:doctorId",
  GET_AVAILABLE_SLOTS: BASE_URL + "/patient/get-available-slots/:doctorId/:date",
  
  // Appointments
  BOOK_APPOINTMENT: BASE_URL + "/patient/book-appointment",
  GET_PATIENT_BOOKINGS: BASE_URL + "/patient/my-booking/:patientId",
  
  // Prescriptions
  GET_PATIENT_PRESCRIPTIONS: BASE_URL + "/patient/my-prescriptions/:patientId",
  GET_PRESCRIPTION_DETAILS: BASE_URL + "/patient/prescription/:prescriptionId"
};

// ========================================
// DOCTOR ENDPOINTS
// ========================================
export const doctorEndpoints = {
  // Profile
  GET_DOCTOR_PROFILE: BASE_URL + "/doctor/my-profile/:doctorId",
  UPDATE_AVAILABILITY: BASE_URL + "/doctor/change-availability/:doctorId",
  
  // Appointments
  GET_DOCTOR_APPOINTMENTS: BASE_URL + "/doctor/my-appointments/:doctorId",
  UPDATE_APPOINTMENT_STATUS: BASE_URL + "/doctor/appointment-status/:appointmentId", 
  GET_APPOINTMENT_DETAILS: BASE_URL + "/doctor/appointment/:appointmentId",
 
  
  // Patients
  GET_PATIENT_HISTORY: BASE_URL + "/doctor/patient-history/:patientId",
  
  // Prescriptions
  CREATE_PRESCRIPTION: BASE_URL + "/doctor/create-prescription",
  GET_DOCTOR_PRESCRIPTIONS: BASE_URL + "/doctor/prescriptions/:doctorId",
  
  // Dashboard
  GET_DOCTOR_DASHBOARD: BASE_URL + "/doctor/my-dashboard/:doctorId"
};

// ========================================
// ADMIN ENDPOINTS  
// ========================================
export const adminEndpoints = {
  // Doctor Management
  ADD_DOCTOR: BASE_URL + "/admin/add-doctor",
  GET_PENDING_DOCTORS: BASE_URL + "/admin/pending-doctors",
  UPDATE_DOCTOR_STATUS: BASE_URL + "/admin/doctor-status-change",
  DELETE_DOCTOR: BASE_URL + "/admin/delete-doctor/:doctorId"
};

// ========================================
// PAYMENT ENDPOINTS  
// ========================================
export const paymentEndpoints={
  CAPTURE_PAYMENT: BASE_URL + "/payment/capture-payment",
  GET_RAZORPAY_KEY: BASE_URL + "/payment/get-razorpay-key",
  VERIFY_PAYMENT: BASE_URL + "/payment/verify-payment",
}