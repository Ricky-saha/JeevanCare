import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/all/Layout'
import ProtectedRoute from './components/all/ProtectedRoute'
import DoctorsPage from './pages/all/DoctorsPage'
import Home from './pages/all/Home'
import About from './pages/all/About'
import Contact from './pages/all/Contact'
import LoginForm from './components/Auth/LoginForm'
import SignupSelector from './components/Auth/SignupSelector'
import PatientSignupForm from './components/Auth/SignupForms/PatientSignupForm'
import DoctorSignupForm from './components/Auth/SignupForms/DoctorSignupForm'
import AdminSignupForm from './components/Auth/SignupForms/AdminSignupForm'
import PatientAppointments from './pages/patients/PatientsAppointment'
import AppointmentBooking from './pages/patients/AppointmentBooking'
import PatientProfile from './pages/patients/PatientProfile'
import PatientPrescriptionList from './pages/patients/PatientPrescriptionList'
import PrescriptionDetail from './pages/patients/PatientPrescriptionDetails'
import DoctorAppointments from './pages/doctors/DoctorsAppointment'
import DoctorProfile from './pages/doctors/DoctorsProfile'
import DoctorsDashboard from './pages/doctors/DoctorsDashboard'
import DoctorDetailAppointment from './pages/doctors/DoctorDetailAppointment'
import AdminPanel from './pages/admins/AdminPanel'

function App() {
  return (
    <>
      <Toaster />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<DoctorsPage />} />
          <Route path='/doctors/:speciality' element={<DoctorsPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />

          {/* Auth Routes (No navbar/footer) */}
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupSelector />} />
          <Route path='/signup/patient' element={<PatientSignupForm />} />
          <Route path='/signup/doctor' element={<DoctorSignupForm />} />
          <Route path='/signup/admin' element={<AdminSignupForm />} />

          {/* Patient Protected Routes */}
          <Route 
            path='/patient/appointments' 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientAppointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/appointment/:docId' 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <AppointmentBooking />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/patient/prescription'
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientPrescriptionList />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/patient/profile' 
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientProfile />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/patient/prescription-detail/:prescriptionId'
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PrescriptionDetail />
              </ProtectedRoute>
            }
          />

          {/* Doctor Protected Routes */}
          <Route 
            path='/doctor/appointments' 
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorAppointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/doctor/profile' 
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/doctor/dashboard' 
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/doctor/appoinment-detail/:appointmentId'
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorDetailAppointment />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route 
            path='/admin/panel' 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App