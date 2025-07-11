// services/operations/paymentApi.js
import { apiConnector } from '../apiConnector'
import { paymentEndpoints } from '../apis'
import { toast } from 'react-hot-toast'

// ========================================
// CAPTURE PAYMENT - Create Razorpay Order
// ========================================
export const capturePayment = async (appointmentIds) => {
  try {
    const token = localStorage.getItem('jeevancare_token')
    
    if (!token) {
      toast.error('Please login first')
      return { success: false, message: 'No token found' }
    }

    const response = await apiConnector(
      'POST',
      paymentEndpoints.CAPTURE_PAYMENT,
      { appointments: Array.isArray(appointmentIds) ? appointmentIds : [appointmentIds] },
      { 'Authorization': `Bearer ${token}` }
    )

    if (response.data.success) {
      return {
        success: true,
        data: response.data.data // ✅ Fixed: Your backend sends { success: true, data: {...} }
      }
    } else {
      toast.error(response.data.message)
      return { success: false, message: response.data.message }
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create payment order'
    toast.error(errorMessage)
    return { success: false, error: errorMessage }
  }
}

// ========================================
// GET RAZORPAY KEY
// ========================================
export const getRazorpayKey = async () => {
  try {
    const token = localStorage.getItem('jeevancare_token') 
    console.log("this is your token", token)// ✅ Fixed: Added auth token
    
    if (!token) {
      toast.error('Please login first')
      return { success: false, message: 'No token found' }
    }

    const response = await apiConnector(
      'GET', 
      paymentEndpoints.GET_RAZORPAY_KEY,
      null, // No body for GET request
      { 'Authorization': `Bearer ${token}` } // ✅ Fixed: Added Authorization header
    )

    if (response.data.success) {
      return {
        success: true,
        key: response.data.key
      }
    } else {
      toast.error(response.data.message)
      return { success: false, message: response.data.message }
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to get Razorpay key'
    toast.error(errorMessage)
    return { success: false, error: errorMessage }
  }
}

// ========================================
// VERIFY PAYMENT
// ========================================
export const verifyPayment = async (paymentData) => {
  try {
    const token = localStorage.getItem('jeevancare_token')
    
    if (!token) {
      toast.error('Please login first')
      return { success: false, message: 'No token found' }
    }

    const response = await apiConnector(
      'POST',
      paymentEndpoints.VERIFY_PAYMENT,
      paymentData,
      { 'Authorization': `Bearer ${token}` }
    )

    if (response.data.success) {
      toast.success('Payment verified successfully!')
      return {
        success: true,
        data: response.data // ✅ This can stay as is
      }
    } else {
      toast.error(response.data.message)
      return { success: false, message: response.data.message }
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Payment verification failed'
    toast.error(errorMessage)
    return { success: false, error: errorMessage }
  }
}