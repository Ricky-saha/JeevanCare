// services/operations/patientApi.js
import { apiConnector } from '../apiConnector'
import { patientEndpoints } from '../apis'
import { 
  setLoading, 
  setError, 
  clearError,
  setProfile,
  setAppointments,
  setPrescriptions,
  setPrescriptionDetails,
  setDoctors,
  setDoctorDetails,
  setAvailableSlots
} from '../../redux/slices/patientSlice'
import { toast } from 'react-hot-toast'
import { logout, refreshFromStorage } from '../../redux/slices/authSlice'

// ========================================
// GET PATIENT PROFILE
// ========================================
export const getPatientProfile = (patientId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = patientEndpoints.GET_PATIENT_PROFILE.replace(':patientId', patientId)
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      dispatch(setLoading(false))
      dispatch(setProfile(data.patient))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// UPDATE PATIENT PROFILE
// ========================================
export const updatePatientProfile = (patientId, formData) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = patientEndpoints.UPDATE_PATIENT_PROFILE.replace(':patientId', patientId)
      
      const response = await apiConnector(
        'PUT',
        url,
        formData,
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      dispatch(setLoading(false))
      dispatch(setProfile(data.patient))
      
      toast.success('Profile updated successfully!')
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET ALL DOCTORS
// ========================================
export const getAllDoctors = () => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const response = await apiConnector('GET', patientEndpoints.GET_ALL_DOCTORS)
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setDoctors(data.doctors))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch doctors'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET DOCTOR DETAILS
// ========================================
export const getDoctorDetails = (doctorId) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const url = patientEndpoints.GET_DOCTOR_PROFILE.replace(':doctorId', doctorId)
      
      const response = await apiConnector('GET', url)
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setDoctorDetails(data.doctor))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch doctor details'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET AVAILABLE SLOTS
// ========================================
export const getAvailableSlots = (doctorId, date) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const url = patientEndpoints.GET_AVAILABLE_SLOTS
        .replace(':doctorId', doctorId)
        .replace(':date', date)
      
      const response = await apiConnector('GET', url)
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setAvailableSlots(data.slots))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch available slots'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// BOOK APPOINTMENT
export const bookAppointment = (appointmentData, navigate) => {
  return async (dispatch, getState) => {
    console.log("Starting bookAppointment API call...")
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      // Get current auth state
      const { auth } = getState()
      let { token } = auth
      
      console.log(" Initial token check:", token ? "Token exists" : "No token")
      
      // If no token in state, try localStorage
      if (!token) {
        console.log(" No token in state, checking localStorage...")
        const storageToken = localStorage.getItem('jeevancare_token')
        if (storageToken) {
          console.log(" Found token in localStorage, refreshing state...")
          dispatch(refreshFromStorage())
          token = storageToken
        } else {
          throw new Error("No authentication token found. Please login again.")
        }
      }
      
      console.log(" Sending appointment data:", appointmentData)
      console.log(" Final token status:", token ? "Token ready" : "No token")
      
      // Prepare headers
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
      // Make API call
      const response = await apiConnector(
        'POST',
        patientEndpoints.BOOK_APPOINTMENT,
        appointmentData,
        headers
      )
      
      console.log(" API Response:", {
        status: response.status,
        success: response.data?.success,
        message: response.data?.message
      })
      
      const data = response.data
      
      // Check for HTTP errors
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP Error: ${response.status}`)
      }
      
      // Check for backend errors
      if (!data.success) {
        console.log(" Backend error:", data.message)
        dispatch(setError(data.message))
        toast.error(data.message)
        dispatch(setLoading(false))
        return { success: false, message: data.message }
      }
      
      // Success
      console.log(" Appointment booked successfully!")
      toast.success(data.message || 'Appointment booked successfully!')
      dispatch(setLoading(false))
      
      // Navigate to appointments page
      if (navigate) {
        navigate('/patient/appointments')
      }
      
      // Refresh appointments list
      if (appointmentData.patientId) {
        dispatch(getPatientBookings(appointmentData.patientId))
      }
      
      return { success: true, data }
      
    } catch (error) {
      console.error(" Booking failed:", error)
      
      let errorMessage = 'Failed to book appointment'
      
      if (error.response) {
        console.log(" Server error:", error.response.data)
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server Error: ${error.response.status}`
        
        // Handle authentication errors
        if (error.response.status === 401) {
          errorMessage = 'Session expired. Please login again.'
          dispatch(logout())
          if (navigate) {
            navigate('/login')
          }
        }
      } else if (error.request) {
        console.log(" Network error:", error.request)
        errorMessage = 'Network error. Please check your connection.'
      } else {
        errorMessage = error.message || 'An unexpected error occurred'
      }
      
      dispatch(setError(errorMessage))
      dispatch(setLoading(false))
      toast.error(errorMessage)
      
      return { success: false, error: errorMessage }
    }
  }
}

//Pay Now

// ========================================
// GET PATIENT BOOKINGS
// ========================================
export const getPatientBookings = (patientId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = patientEndpoints.GET_PATIENT_BOOKINGS.replace(':patientId', patientId)
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setAppointments(data.appointments))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch appointments'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET PATIENT PRESCRIPTIONS
// ========================================
export const getPatientPrescriptions = (patientId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = patientEndpoints.GET_PATIENT_PRESCRIPTIONS.replace(':patientId', patientId)
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setPrescriptions(data.prescriptions))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch prescriptions'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET PRESCRIPTION DETAILS
// ========================================
export const getPrescriptionDetails = (prescriptionId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = patientEndpoints.GET_PRESCRIPTION_DETAILS.replace(':prescriptionId', prescriptionId)
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return
      }
      
      dispatch(setPrescriptionDetails(data.prescription))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch prescription details'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}