// ========================================
// 3. DOCTOR SLICE - redux/slices/doctorSlice.js
// ========================================
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Profile
  profile: null,
  
  // Appointments
  appointments: [],
  appointmentDetails: null,
  
  // Patients
  patientHistory: null,
  
  // Prescriptions
  prescriptions: [],
  
  // Dashboard
  dashboard: null,
  
  // Video Call Status
  completedVideoCalls: [], 
  
  // Loading & Error
  loading: false,
  error: null
}

const doctorSlice = createSlice({
  name: 'doctor',
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
    setAppointmentDetails: (state, action) => {
      state.appointmentDetails = action.payload
      state.loading = false
    },
    
    // Patient History
    setPatientHistory: (state, action) => {
      state.patientHistory = action.payload
      state.loading = false
    },
    
    // Prescriptions
    setPrescriptions: (state, action) => {
      state.prescriptions = action.payload
      state.loading = false
    },
    
    // Dashboard
    setDashboard: (state, action) => {
      state.dashboard = action.payload
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
    resetDoctorData: (state) => {
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
  setAppointmentDetails,
  setPatientHistory,
  setPrescriptions,
  setDashboard,
  addCompletedVideoCall,
  removeCompletedVideoCall,
  resetDoctorData
} = doctorSlice.actions

export default doctorSlice.reducer