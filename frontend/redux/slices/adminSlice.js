// ========================================
// 4. ADMIN SLICE - redux/slices/adminSlice.js
// ========================================
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Profile
  profile: null,
  
  // Doctor Management
  pendingDoctors: [],
  allDoctors: [],
  
  // Loading & Error
  loading: false,
  error: null
}

const adminSlice = createSlice({
  name: 'admin',
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
    
    // Doctors
    setPendingDoctors: (state, action) => {
      state.pendingDoctors = action.payload
      state.loading = false
    },
    setAllDoctors: (state, action) => {
      state.allDoctors = action.payload
      state.loading = false
    },
    
    // Remove doctor from pending when approved/rejected
    removePendingDoctor: (state, action) => {
      const doctorId = action.payload
      state.pendingDoctors = state.pendingDoctors.filter(doc => doc.id !== doctorId)
    },
    
    // Reset
    resetAdminData: (state) => {
      return initialState
    }
  }
})

export const {
  setLoading,
  setError,
  clearError,
  setProfile,
  setPendingDoctors,
  setAllDoctors,
  removePendingDoctor,
  resetAdminData
} = adminSlice.actions

export default adminSlice.reducer