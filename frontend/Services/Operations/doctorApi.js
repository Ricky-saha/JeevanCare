// services/operations/doctorApi.js
import { apiConnector } from '../apiConnector'
import { doctorEndpoints } from '../apis'
import { 
  setLoading, 
  setError, 
  clearError,
  setProfile,
  setAppointments,
  setAppointmentDetails,
  setPatientHistory,
  setPrescriptions,
  setDashboard
} from '../../redux/slices/doctorSlice'
import { toast } from 'react-hot-toast'

// ========================================
// GET DOCTOR PROFILE
// ========================================
export const getDoctorProfile = (doctorId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = doctorEndpoints.GET_DOCTOR_PROFILE.replace(':doctorId', doctorId)
      
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
      dispatch(setProfile(data.doctor))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// UPDATE AVAILABILITY 
// ========================================
export const updateAvailability = (doctorId, available) => {
  return async (dispatch, getState) => {
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const { profile } = getState().doctor
      
      if (!token) {
        throw new Error('No authentication token found')
      }
      
      const url = doctorEndpoints.UPDATE_AVAILABILITY.replace(':doctorId', doctorId)
      
      const response = await apiConnector(
        'PUT',
        url,
        { available },
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      if (!response || !response.data) {
        throw new Error('Invalid response from server')
      }
      
      const data = response.data
      
      if (!data.success) {
        dispatch(setError(data.message))
        throw new Error(data.message)
      }
      
      // Update profile with the new availability - merge with existing profile
      dispatch(setProfile({ 
        ...profile, 
        available: available 
      }))
      
      console.log('Redux: Profile updated with availability:', available)
      
      return { success: true, available }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update availability'
      dispatch(setError(errorMessage))
      console.error('Redux: Error updating availability:', errorMessage)
      throw error
    }
  }
}
// ========================================
// GET DOCTOR APPOINTMENTS
// ========================================
export const getDoctorAppointments = (doctorId, filter = 'all') => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = doctorEndpoints.GET_DOCTOR_APPOINTMENTS.replace(':doctorId', doctorId)
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        },
        { filter } // Query params
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
// UPDATE APPOINTMENT STATUS
// ========================================
export const updateAppointmentStatus = (appointmentId, status) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token, user } = getState().auth
      const url = doctorEndpoints.UPDATE_APPOINTMENT_STATUS.replace(':appointmentId', appointmentId)
      
      const response = await apiConnector(
        'PUT',
        url,
        {
          status,
          doctorId: user.id
        },
        {
          'Authorization': `Bearer ${token}`
        }
      )
      
      const data = response.data
      console.log("Full response:", response)
      console.log("Response data:", response.data)
      
      if (!data.success) {
        dispatch(setError(data.message))
        toast.error(data.message)
        return { success: false, message: data.message }
      }
      
     
      
      // Refresh appointments list
      dispatch(getDoctorAppointments(user.id))
      
      // Return the success response - this will be available in your component
    
      // navigate("/doctor/appointments")
      return { success: true, data: data }
      
        
     
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update appointment status'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
      
      // Return error response - this will be available in your component
      
      return { success: false, message: errorMessage }
      
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// ========================================
// GET APPOINTMENT DETAILS
// ========================================
export const getAppointmentDetails = (appointmentId) => {
  console.log("appointmentId-->", appointmentId)
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      console.log("token is here-->", token)
      const url = doctorEndpoints.GET_APPOINTMENT_DETAILS.replace(':appointmentId', appointmentId)
      
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
        return { payload: { success: false, message: data.message } } // Return error payload
      }
      
      dispatch(setAppointmentDetails(data.appointment))
      dispatch(setLoading(false)) // Add this
      
      // Return success payload - THIS WAS MISSING!
      return { payload: { success: true, appointment: data.appointment } }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch appointment details'
      dispatch(setError(errorMessage))
      dispatch(setLoading(false)) // Add this
      toast.error(errorMessage)
      
      // Return error payload
      return { payload: { success: false, message: errorMessage } }
    }
  }
}

// ========================================
// GET PATIENT HISTORY
// ========================================
export const getPatientHistory = (patientId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = doctorEndpoints.GET_PATIENT_HISTORY.replace(':patientId', patientId)
      
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
      
      dispatch(setPatientHistory(data))
       return { payload: data }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch patient history'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
       return { payload: { success: false, message: errorMessage } }
    }
  }
}

// ========================================
// CREATE PRESCRIPTION
// ========================================
export const createPrescription = (prescriptionData) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    console.log('=== REDUX ACTION DEBUG ===')
    console.log('Prescription data received in action:', prescriptionData)
    
    try {
      const { token } = getState().auth
      console.log('Auth token exists:', !!token)
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token')
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
      console.log('Request headers:', headers)
      console.log('API endpoint:', doctorEndpoints.CREATE_PRESCRIPTION)
      
      const response = await apiConnector(
        'POST',
        doctorEndpoints.CREATE_PRESCRIPTION,
        prescriptionData,
        headers
      )
      
      console.log('Raw API response:', response)
      console.log('Response status:', response.status)
      console.log('Response data:', response.data)
      
      const data = response.data
      
      if (!data.success) {
        console.error('API returned success: false', data)
        dispatch(setError(data.message))
        return { success: false, message: data.message }
      }
      
      // Optionally refresh prescriptions list
      dispatch(getDoctorPrescriptions(prescriptionData.doctorId))
      
      return { success: true, data: data }
      
    } catch (error) {
      console.error('=== REDUX ACTION ERROR ===')
      console.error('Error object:', error)
      console.error('Error response:', error.response)
      console.error('Error response data:', error.response?.data)
      console.error('Error response status:', error.response?.status)
      console.error('Error response headers:', error.response?.headers)
      
      const errorMessage = error.response?.data?.message || 'Failed to create prescription'
      dispatch(setError(errorMessage))
      return { success: false, message: errorMessage }
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// ========================================
// GET DOCTOR PRESCRIPTIONS
// ========================================
export const getDoctorPrescriptions = (doctorId, status = null, limit = null) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = doctorEndpoints.GET_DOCTOR_PRESCRIPTIONS.replace(':doctorId', doctorId)
      
      // Build query params
      const params = {}
      if (status) params.status = status
      if (limit) params.limit = limit
      
      const response = await apiConnector(
        'GET',
        url,
        null,
        {
          'Authorization': `Bearer ${token}`
        },
        params
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
// GET DOCTOR DASHBOARD
// ========================================
export const getDoctorDashboard = (doctorId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = doctorEndpoints.GET_DOCTOR_DASHBOARD.replace(':doctorId', doctorId)
      
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
      
      dispatch(setDashboard(data.dashboard))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}