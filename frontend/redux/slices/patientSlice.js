// ========================================
// 2. PATIENT SLICE - redux/slices/patientSlice.js
// ========================================
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Profile
  profile: null,
  
  // Appointments
  appointments: [],
  
  // Prescriptions
  prescriptions: [],
  prescriptionDetails: null,
  
  // Doctors
  doctors: [],
  doctorDetails: null,
  availableSlots: [],
  
  // Video Call Status
  completedVideoCalls: [], 
  
  // Loading & Error
  loading: false,
  error: null
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
    
    // Profile
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    
    // Appointments
    setAppointments: (state, action) => {
      state.appointments = action.payload
      state.loading = false
    },
    
    // Prescriptions
    setPrescriptions: (state, action) => {
      state.prescriptions = action.payload
      state.loading = false
    },
    setPrescriptionDetails: (state, action) => {
      state.prescriptionDetails = action.payload
      state.loading = false
    },
    
    // Doctors
    setDoctors: (state, action) => {
      state.doctors = action.payload
      state.loading = false
    },
    setDoctorDetails: (state, action) => {
      state.doctorDetails = action.payload
      state.loading = false
    },
    setAvailableSlots: (state, action) => {
      state.availableSlots = action.payload
      state.loading = false
    },
    
    // Video Call Management
    addCompletedVideoCall: (state, action) => {
      const appointmentId = action.payload
      if (!state.completedVideoCalls.includes(appointmentId)) {
        state.completedVideoCalls.push(appointmentId)
      }
    },
    
    removeCompletedVideoCall: (state, action) => {
      const appointmentId = action.payload
      state.completedVideoCalls = state.completedVideoCalls.filter(id => id !== appointmentId)
    },
    
    // Reset
    resetPatientData: (state) => {
      return initialState
    }
  }
})

export const {
  setLoading,
  setError,
  clearError,
  setProfile,
  setAppointments,
  setPrescriptions,
  setPrescriptionDetails,
  setDoctors,
  setDoctorDetails,
  setAvailableSlots,
  addCompletedVideoCall,
  removeCompletedVideoCall,
  resetPatientData
} = patientSlice.actions

export default patientSlice.reducer