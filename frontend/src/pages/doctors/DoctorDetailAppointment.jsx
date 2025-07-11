import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft } from 'lucide-react'
import {
  getAppointmentDetails,
  updateAppointmentStatus,
  getPatientHistory
} from '../../../Services/Operations/doctorApi'
import ErrorPage from '../../components/all/ErrorPage'
import LoadingPage from '../../components/all/LoadingPage'
import PatientHistory from '../../components/Doctor/PatientHistory'
import AppointmentInfoCard from '../../components/Doctor/AppointmentInfoCard'
import PatientInfoCard from '../../components/Doctor/PatientInfoCard'
import ActionSidebar from '../../components/Doctor/ActionSidebar'
import { toast } from 'react-hot-toast'

const DoctorDetailAppointment = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [appointment, setAppointment] = useState(null)
  const [patientHistory, setPatientHistory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusLoading, setStatusLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    fetchAppointmentData()
  }, [appointmentId])

  const fetchAppointmentData = async () => {
    try {
      setLoading(true)

      const appointmentRes = await dispatch(getAppointmentDetails(appointmentId))
      if (appointmentRes?.payload?.success) {
        setAppointment(appointmentRes.payload.appointment)

        const historyRes = await dispatch(getPatientHistory(appointmentRes.payload.appointment.patient.id))
        
        if (historyRes?.payload?.success) {
          setPatientHistory(historyRes.payload)
        }
      } else {
        setError('Failed to fetch appointment details')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async newStatus => {
    try {
      setStatusLoading(true)

      const result = await dispatch(updateAppointmentStatus(appointmentId, newStatus))

      if (result?.success) {
        setAppointment(prev => ({ ...prev, status: newStatus }))
        toast.success(`Appointment ${newStatus.toLowerCase()} successfully!`, {
          duration: 5000
        })
        navigate("/doctor/appointments")
      } else {
        alert('Failed to update appointment status')
      }
    } catch (err) {
      alert('Error updating status: ' + err.message)
    } finally {
      setStatusLoading(false)
    }
  }

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage error={error} />
  if (!appointment) return <ErrorPage error='Appointment not found' />

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={() => navigate('/doctor/appointments')}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors'
          >
            <ChevronLeft className='w-5 h-5' />
            Back to Appointments
          </button>

          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>
            Appointment Details
          </h1>

          <div className='w-32'></div>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='lg:col-span-2 space-y-6'>
            <AppointmentInfoCard appointment={appointment} />

            <PatientInfoCard patient={appointment.patient} />

            {/* Patient History Toggle */}
            {patientHistory && (
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className='w-full flex items-center justify-between text-left'
                >
                  <h2 className='text-2xl font-bold text-gray-800'>
                    Patient Medical History
                  </h2>
                  <div className='text-blue-600 text-2xl'>
                    {showHistory ? '−' : '+'}
                  </div>
                </button>

                {showHistory && (
                  <div className='mt-6'>
                    <PatientHistory data={patientHistory} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <ActionSidebar
            appointment={appointment}
            patientHistory={patientHistory}
            onStatusUpdate={handleStatusUpdate}
            statusLoading={statusLoading}
            doctorId={user.id}
            patientId={appointment.patient.id}
            appointmentId={appointmentId}
          />
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailAppointment