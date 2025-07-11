// services/operations/adminApi.js
import { apiConnector } from '../apiConnector'
import { adminEndpoints } from '../apis'
import { 
  setLoading, 
  setError, 
  clearError,
  setProfile,
  setPendingDoctors,
  removePendingDoctor
} from '../../redux/slices/adminSlice'
import { toast } from 'react-hot-toast'

// ========================================
// GET ADMIN PROFILE
// ========================================
export const getAdminProfile = (adminId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      
      // Note: You might need to add this endpoint to your backend
      const response = await apiConnector(
        'GET',
        `/admin/profile/${adminId}`,
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
      
      dispatch(setProfile(data.admin))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// ADD DOCTOR (Manual Addition by Admin)
// ========================================
export const addDoctor = (formData) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      
      const response = await apiConnector(
        'POST',
        adminEndpoints.ADD_DOCTOR,
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
      
      toast.success('Doctor added successfully!')
      dispatch(setLoading(false))
      
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add doctor'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

// ========================================
// GET PENDING DOCTORS
// ========================================
export const getPendingDoctors = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      
      const response = await apiConnector(
        'GET',
        adminEndpoints.GET_PENDING_DOCTORS,
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
      
      dispatch(setPendingDoctors(data.doctors))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch pending doctors'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}


// ========================================
// UPDATE DOCTOR STATUS (Approve/Reject)
// ========================================
export const updateDoctorStatus = (doctorId, status) => {
  console.log(status)
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      
      const response = await apiConnector(
        'PUT',
        adminEndpoints.UPDATE_DOCTOR_STATUS,
        { doctorId, status },
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
      
      // Remove from pending doctors list
      dispatch(removePendingDoctor(doctorId))
      
      toast.success(`Doctor ${status.toLowerCase()} successfully!`)
      dispatch(setLoading(false))
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update doctor status'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}


// ========================================
// DELETE DOCTOR ACCOUNT
// ========================================
export const deleteDoctorAccount = (doctorId) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      const { token } = getState().auth
      const url = adminEndpoints.DELETE_DOCTOR.replace(':doctorId', doctorId)
      
      const response = await apiConnector(
        'DELETE',
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
      
      toast.success('Doctor deleted successfully!')
      
      // Refresh both lists
      dispatch(getPendingDoctors())
      dispatch(getAllDoctors())
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete doctor'
      dispatch(setError(errorMessage))
      toast.error(errorMessage)
    }
  }
}

