// ========================================
// 1. FIXED AUTH SLICE - redux/slices/authSlice.js
// ========================================
import { createSlice } from '@reduxjs/toolkit'

const getTokenFromStorage = () => {
  try {
    const token = localStorage.getItem('jeevancare_token')
    console.log(" Token from localStorage:", token ? "Token exists" : "No token found")
    return token || null
  } catch (error) {
    console.error(" Error getting token from localStorage:", error)
    return null
  }
}

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('jeevancare_user')
    if (user) {
      const parsedUser = JSON.parse(user)
      console.log(" User from localStorage:", parsedUser)
      return parsedUser
    }
    return null
  } catch (error) {
    console.error(" Error getting user from localStorage:", error)
    return null
  }
}

const getRoleFromStorage = () => {
  try {
    const role = localStorage.getItem('jeevancare_role')
    console.log(" Role from localStorage:", role)
    return role || null
  } catch (error) {
    console.error(" Error getting role from localStorage:", error)
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  role: getRoleFromStorage(),
  isAuthenticated: !!getTokenFromStorage(),
  loading: false,
  error: null
}

// Log initial state for debugging
console.log(" Auth Initial State:", initialState)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      const { user, token, role } = action.payload
      
      console.log(" Login success payload:", action.payload)
      
      state.user = user
      state.token = token
      state.role = role
      state.isAuthenticated = true
      state.loading = false
      state.error = null
      
      // Store in localStorage
      try {
        localStorage.setItem('jeevancare_token', token)
        localStorage.setItem('jeevancare_user', JSON.stringify(user))
        localStorage.setItem('jeevancare_role', role)
        console.log(" Data saved to localStorage successfully")
      } catch (error) {
        console.error(" Error saving to localStorage:", error)
      }
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.role = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      state.isAuthenticated = false
      state.error = null
      state.loading = false
      
      // Clear localStorage
      try {
        localStorage.removeItem('jeevancare_token')
        localStorage.removeItem('jeevancare_user')
        localStorage.removeItem('jeevancare_role')
        console.log(" localStorage cleared on logout")
      } catch (error) {
        console.error(" Error clearing localStorage:", error)
      }
    },
    clearError: (state) => {
      state.error = null
    },
    // Add this new action to refresh token from localStorage
    refreshFromStorage: (state) => {
      const token = getTokenFromStorage()
      const user = getUserFromStorage()
      const role = getRoleFromStorage()
      
      if (token && user && role) {
        state.token = token
        state.user = user
        state.role = role
        state.isAuthenticated = true
        console.log("Auth state refreshed from localStorage")
      } else {
        console.log("Incomplete data in localStorage, staying logged out")
      }
    }
  }
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError,
  refreshFromStorage 
} = authSlice.actions

export default authSlice.reducer