// services/operations/authApi.js
import { apiConnector } from '../apiConnector'
import { authEndpoints } from '../apis'
import { loginStart, loginSuccess, loginFailure, clearError, logout } from '../../redux/slices/authSlice'
import { toast } from 'react-hot-toast'

// ========================================
// PATIENT LOGIN
// ========================================
export const loginPatient = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.PATIENT_LOGIN,
        { email, password }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success - update Redux state
      dispatch(loginSuccess({
        user: data.patient,
        token: data.token,
        role: 'Patient'
      }))
      
      toast.success('Login successful!')
      navigate('/') // Redirect to Home page
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// DOCTOR LOGIN  
// ========================================
export const loginDoctor = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.DOCTOR_LOGIN,
        { email, password }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success - update Redux state
      dispatch(loginSuccess({
        user: data.doctor,
        token: data.token,
        role: 'Doctor'
      }))
      
      toast.success('Login successful!')
      navigate('/doctor/appointments') // Redirect to doctor dashboard
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// ADMIN LOGIN
// ========================================
export const loginAdmin = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.ADMIN_LOGIN,
        { email, password }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success - update Redux state
      dispatch(loginSuccess({
        user: data.admin,
        token: data.token,
        role: 'Admin'
      }))
      
      toast.success('Login successful!')
      navigate('/admin/panel') // Redirect to admin dashboard
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// PATIENT SIGNUP
// ========================================
export const signupPatient = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.PATIENT_SIGNUP,
        formData,
        {
          'Content-Type': 'multipart/form-data' // For image upload
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success
      dispatch(loginSuccess({
        user: { id: data.patientId, email: formData.email },
        token: null, // No auto-login after signup
        role: 'Patient'
      }))
      
      toast.success('Account created successfully! Please login.')
      navigate('/login') // Redirect to login page
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// DOCTOR SIGNUP
// ========================================
export const signupDoctor = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.DOCTOR_SIGNUP,
        formData,
        {
          'Content-Type': 'multipart/form-data' // For image upload
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success
      dispatch(loginSuccess({
        user: { id: data.doctorId, email: formData.email },
        token: null, // No auto-login after signup
        role: 'Doctor'
      }))
      
      toast.success('Account created successfully! Please wait for admin verification.')
      navigate('/login') // Redirect to login page
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// ADMIN SIGNUP
// ========================================
export const signupAdmin = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(loginStart())
    dispatch(clearError())
    
    try {
      const response = await apiConnector(
        'POST',
        authEndpoints.ADMIN_SIGNUP,
        formData,
        {
          'Content-Type': 'multipart/form-data' // For image upload
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(loginFailure(data.message))
        toast.error(data.message)
        return
      }
      
      // Success
      dispatch(loginSuccess({
        user: { id: data.adminId, email: formData.email },
        token: null, // No auto-login after signup
        role: 'Admin'
      }))
      
      toast.success('Admin account created successfully! Please login.')
      navigate('/login') // Redirect to login page
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed'
      dispatch(loginFailure(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// LOGOUT (Frontend only)
// ========================================
export const logoutUser = (navigate) => {
  return async (dispatch) => {
    try {
      // Import logout action
      
      dispatch(logout())
      toast.success('Logged out successfully!')
      navigate('/') // Redirect to home page
      
    } catch (error) {
      console.log(error)
      toast.error('Logout failed')
    }
  }
}