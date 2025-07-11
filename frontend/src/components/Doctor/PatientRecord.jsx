import React from 'react'
import { Calendar, Clock, FileText, Pill, User, CreditCard, Eye } from 'lucide-react'
import { formatDate } from '../utils/FormatDate'

const PatientRecords = ({ data, activeTab, onViewPrescription }) => {
 

  

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-500 text-white',
      cancelled: 'bg-red-500 text-white', 
      scheduled: 'bg-blue-500 text-white',
      active: 'bg-emerald-500 text-white'
    }
    return colors[status?.toLowerCase()] || 'bg-amber-500 text-white'
  }
  

  if (activeTab === 'appointments') {
    return (
      <div className='space-y-4'>
        {data.appointments?.length > 0 ? data.appointments.map((appointment, i) => (
          <div key={appointment._id || i} className='bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-3'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  <User className='w-4 h-4 text-blue-600' />
                </div>
                <div>
                  <p className='font-semibold'>{appointment.doctorId?.name}</p>
                  <p className='text-sm text-blue-600'>{appointment.doctorId?.speciality}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>{formatDate(appointment.appointmentDate)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>{appointment.timeSlot}</span>
              </div>
              <div className='flex items-center gap-2'>
                <CreditCard className='w-4 h-4' />
                <span>₹{appointment.fees}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className={`w-3 h-3 rounded-full ${appointment.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={appointment.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}>
                  {appointment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className='text-center py-8 text-gray-500'>
            <p>No appointments found</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {data.prescriptions?.length > 0 ? data.prescriptions.map((prescription, i) => (
        <div key={prescription._id || i} className='bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex justify-between items-start mb-3'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <FileText className='w-4 h-4 text-green-600' />
              </div>
              <div>
                <p className='font-semibold'>Prescription {prescription.prescriptionId}</p>
                <p className='text-sm text-green-600'>{prescription.doctorId?.name}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                {prescription.status}
              </span>
              <button
                onClick={() => onViewPrescription(prescription)}
                className='flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs transition-colors'
              >
                <Eye className='w-3 h-3' />
                View
              </button>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 text-sm text-gray-600 mb-3'>
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              <span>{formatDate(prescription.createdAt)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Pill className='w-4 h-4' />
              <span>{prescription.medicines?.length || 0} medicines</span>
            </div>
            {prescription.followUpDate && (
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>Follow-up: {formatDate(prescription.followUpDate)}</span>
              </div>
            )}
          </div>

          {prescription.generalInstructions && (
            <div className='bg-amber-50 border border-amber-200 rounded-lg p-3'>
              <p className='text-sm text-amber-800'>
                <span className='font-medium'>Instructions: </span>
                {prescription.generalInstructions}
              </p>
            </div>
          )}
        </div>
      )) : (
        <div className='text-center py-8 text-gray-500'>
          <p>No prescriptions found</p>
        </div>
      )}
    </div>
  )
}

export default PatientRecords