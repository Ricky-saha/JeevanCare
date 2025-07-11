// redux/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import patientSlice from '../slices/patientSlice'
import doctorSlice from '../slices/doctorSlice'
import adminSlice from '../slices/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patient: patientSlice,
    doctor: doctorSlice,
    admin: adminSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions that might have non-serializable data
        ignoredActions: ['auth/loginPatient/fulfilled', 'auth/loginDoctor/fulfilled', 'auth/loginAdmin/fulfilled']
      }
    }),
  devTools: import.meta.env.MODE !== 'production' // Enable Redux DevTools in development
})

export default store