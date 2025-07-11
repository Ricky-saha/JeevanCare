// src/components/common/AppointmentList.jsx
import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentCard from './AppoinmentCard'
import LoadingPage from '../all/LoadingPage'
import ErrorPage from '../all/ErrorPage'

const AppointmentList = ({
  appointments,
  loading,
  error,
  userRole,
  title,
  emptyMessage,
  showBookButton = false,
  onPayment,
  onVideoCall,
  completedVideoCalls = [], // New prop to pass completed video calls
  itemsPerPage = 5
}) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // Simple pagination
  const { paginatedData, totalPages } = useMemo(() => {
    if (!appointments?.length) return { paginatedData: [], totalPages: 0 }

    const total = Math.ceil(appointments.length / itemsPerPage)
    const start = (currentPage - 1) * itemsPerPage
    const data = appointments.slice(start, start + itemsPerPage)

    return { paginatedData: data, totalPages: total }
  }, [appointments, currentPage, itemsPerPage])

  const handlePayment = appointmentId => {
    onPayment ? onPayment(appointmentId) : alert('Payment gateway opening...')
  }

const handleVideoCall = (appointmentId, personName) => {
  onVideoCall
    ? onVideoCall(appointmentId, personName)
    : alert(`Video calling ${personName}...`)
}

useEffect(() => {
  window.scrollTo(0, 0)
}, [currentPage])

if (loading) return <LoadingPage />
  if (error) return <ErrorPage error={error} />


  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2'>
            {title}
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto'></div>
        </div>

        {/* Empty State */}
        {!appointments?.length ? (
          <div className='text-center py-12'>
            <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto'>
              <div className='text-6xl mb-4'>📅</div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                No Appointments Found
              </h3>
              <p className='text-gray-500 mb-6'>{emptyMessage}</p>
              {showBookButton && (
                <button
                  onClick={() => navigate('/doctors')}
                  className='bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300'
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Appointments */}
            <div className='space-y-6 mb-8'>
              {paginatedData.map((appointment, index) => (
                <AppointmentCard
                  key={appointment.appointmentId || appointment.id || index}
                  appointment={appointment}
                  userRole={userRole}
                  onPayment={handlePayment}
                  onVideoCall={handleVideoCall}
                  completedVideoCalls={completedVideoCalls} // Pass completed video calls
                />
              ))}
            </div>

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center space-x-4 bg-white rounded-2xl shadow-xl p-6'>
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(1, prev - 1))
                    window.scrollTo(0, 0) // ✅ now this will work
                  }}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>

                <span className='text-gray-700 font-medium'>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                    window.scrollTo(0, 0)
                  }}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentList
