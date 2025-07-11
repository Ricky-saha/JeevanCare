// src/pages/doctor/DoctorAppointments.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorAppointments } from '../../../Services/Operations/doctorApi'
import { addCompletedVideoCall } from '../../../redux/slices/doctorSlice'
import AppointmentList from '../../components/PatientDoctor/AppoinmentList'
import VideoCall from '../../components/VideoCall/VideoCall'

const DoctorAppointments = () => {
  const dispatch = useDispatch()
  const [appointmentFilter, setAppointmentFilter] = useState('all')
  const [currentVideoCall, setCurrentVideoCall] = useState(null)
  
  const { user } = useSelector(state => state.auth)
  const { appointments, loading, error, completedVideoCalls } = useSelector(state => state.doctor)

  useEffect(() => {
    if (user && user.id) {
      dispatch(getDoctorAppointments(user.id, appointmentFilter))
    }
  }, [dispatch, user, appointmentFilter])

  const handleFilterChange = filter => {
    setAppointmentFilter(filter)
  }

  const handleVideoCall = (appointmentId, patientName) => {
    // Find the appointment
    const appointment = appointments.find(apt => 
      (apt.appointmentId || apt.id) === appointmentId
    );
    
    if (!appointment) {
      alert('Appointment not found');
      return;
    }
    
    // Check if video call already completed
    if (completedVideoCalls.includes(appointmentId)) {
      alert('Video consultation for this appointment has already been completed.');
      return;
    }
    
    // Check payment status
    const isPaid = appointment.paymentStatus === 'paid' || 
                   appointment.paymentStatus === 'Paid' || 
                   appointment.isPaid;
    
    if (!isPaid) {
      alert('Patient payment is pending. Video call will be available after payment.');
      return;
    }
    
    // Start video call
    setCurrentVideoCall({
      appointmentId,
      doctorName: user.name || user.firstName || user.fullName || 'Doctor',
      patientName: patientName || appointment.patientName || 'Patient',
      userRole: 'doctor',
      userId: user.id || user._id
    });
  }

  const handleCallEnd = () => {
    if (currentVideoCall) {
      // Mark video call as completed in Redux store
      dispatch(addCompletedVideoCall(currentVideoCall.appointmentId));
    }
    setCurrentVideoCall(null);
  };

  const getEmptyMessage = () => {
    switch (appointmentFilter) {
      case 'today': return 'No appointments scheduled for today.'
      case 'upcoming': return 'No upcoming appointments found.'
      case 'past': return 'No past appointments found.'
      default: return 'No patient appointments scheduled.'
    }
  }

  // Show video call if active
  if (currentVideoCall) {
    return (
      <VideoCall
        appointmentId={currentVideoCall.appointmentId}
        doctorName={currentVideoCall.doctorName}
        patientName={currentVideoCall.patientName}
        userRole={currentVideoCall.userRole}
        userId={currentVideoCall.userId}
        onCallEnd={handleCallEnd}
      />
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className='flex justify-center mb-8'>
        <div className='bg-white rounded-lg p-1 shadow-lg border border-gray-200'>
          {['all', 'today', 'upcoming', 'past'].map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                appointmentFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Use Reusable Component */}
      <AppointmentList
        appointments={appointments}
        loading={loading}
        error={error}
        userRole="Doctor"
        title="Patient Appointments"
        emptyMessage={getEmptyMessage()}
        onVideoCall={handleVideoCall}
        completedVideoCalls={completedVideoCalls}
      />
    </div>
  )
}

export default DoctorAppointments