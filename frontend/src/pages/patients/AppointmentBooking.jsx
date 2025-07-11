// src/pages/patients/AppointmentBooking.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorDetails, bookAppointment, getAllDoctors } from '../../../Services/Operations/patientApi'
import { refreshFromStorage } from '../../../redux/slices/authSlice'
import DoctorProfileCard from '../../components/all/DoctorProfileCard'
import SlotBooking from '../../components/Patient/SlotBooking'
import RelatedDoctors from '../../components/Patient/RelatedDoctors'
import LoadingPage from '../../components/all/LoadingPage'
import toast from 'react-hot-toast'
import ErrorPage from '../../components/all/ErrorPage'

export default function AppointmentBooking() {
  const { docId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Redux state
  const { doctorDetails, loading: doctorLoading, error: doctorError, doctors } = useSelector(state => state.patient)
  const { user, token, isAuthenticated } = useSelector(state => state.auth)

  // Initialize auth and fetch data
  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(refreshFromStorage())
      setIsInitialized(true)
    }
    initializeApp()
  }, [dispatch])

  // Handle authentication redirect
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/login')
    }
  }, [isInitialized, isAuthenticated, navigate])

  // Fetch doctor details and all doctors
  useEffect(() => {
    if (isInitialized && isAuthenticated && docId) {
      dispatch(getDoctorDetails(docId))
      if (!doctors.length) {
        dispatch(getAllDoctors())
      }
    }
  }, [isInitialized, isAuthenticated, docId, doctors.length, dispatch])

  // Book appointment handler
  const handleBookAppointment = async (appointmentData) => {
    if (!user || !token) {
      toast.error('Please login to book an appointment')
      navigate('/login')
      return
    }

    if (!doctorDetails) {
      toast.error('Doctor information not available. Please try again.')
      return
    }

    try {
      const bookingData = {
        doctorId: doctorDetails._id || doctorDetails.id || docId,
        patientId: user._id || user.id,
        appointmentDate: appointmentData.date,
        timeSlot: appointmentData.time
      }

      await dispatch(bookAppointment(bookingData, navigate))
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }

  // Loading state
  if (!isInitialized || doctorLoading || !isAuthenticated) {
    return <LoadingPage />
  }

  // Error state
  if (doctorError) {
   
    return (
       <ErrorPage error={doctorError} onRetry={()=>dispatch(getDoctorDetails(docId))}/>
    )
  }

  // Doctor not found
  if (!doctorDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">👨‍⚕️</div>
          <div className="text-xl text-gray-600 mb-4">Doctor not found</div>
          <button 
            onClick={() => navigate('/doctors')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <DoctorProfileCard docInfo={doctorDetails} />
        
        <SlotBooking 
          docInfo={doctorDetails}
          onBookAppointment={handleBookAppointment}
        />

        {doctors.length > 0 && (
          <RelatedDoctors 
            doctors={doctors}
            currentDocInfo={doctorDetails}
          />
        )}
      </div>
    </div>
  )
}