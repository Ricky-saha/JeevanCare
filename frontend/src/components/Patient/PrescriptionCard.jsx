import { useNavigate } from 'react-router-dom'
import { Eye, Pill, Clock, FileText } from 'lucide-react'
import { formatDate } from '../utils/FormatDate'

export default function PrescriptionCard ({ prescription }) {
  const navigate = useNavigate()

  const handleViewPrescription = () => {
    navigate(`/patient/prescription-detail/${prescription._id}`)
  }


  const statusConfig = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
  }

  const getStatusColor = status => {
    return statusConfig[status?.toLowerCase()] || statusConfig.default
  }

  const doctorName = prescription.doctorId?.name || 'Unknown Doctor'
  const speciality = prescription.doctorId?.speciality || 'General Medicine'
  const prescriptionId =
    prescription.prescriptionId ||
    `#${prescription._id?.slice(-6).toUpperCase()}`
  const medicineCount = prescription.medicines?.length || 0
  const status = prescription.status || 'Active'

  return (
    <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden'>
      {/* Header */}
      <div className='p-6 pb-4'>
        <div className='flex items-start justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-16 h-16 rounded-full border-4 border-blue-200 overflow-hidden flex-shrink-0'>
              <img
                src={prescription.doctorId?.image}
                alt={doctorName}
                className='w-full h-full object-cover'
                onError={e => {
                  e.target.src = '/api/placeholder/64/64'
                }}
              />
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-800'>{doctorName}</h3>
              <p className='text-blue-600 font-medium text-sm'>{speciality}</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </div>
        </div>

        {/* Prescription ID */}
        <div className='mb-4'>
          <p className='text-sm text-gray-600'>Prescription ID</p>
          <p className='font-semibold text-gray-800'>{prescriptionId}</p>
        </div>

        {/* Date & Time */}
        <div className='mb-4'>
          <p className='text-sm text-blue-600 font-medium'>Date & Time</p>
          <p className='text-lg font-semibold text-gray-800'>
            {formatDate(prescription.appointmentId?.appointmentDate)} |{' '}
            {prescription.appointmentId?.timeSlot}
          </p>
        </div>

        {/* Medicines Count */}
        <div className='mb-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-600'>Medicines Prescribed</span>
            <div className='flex items-center space-x-2'>
              <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center'>
                <Pill className='w-3 h-3 text-green-600' />
              </div>
              <span className='font-semibold text-gray-800'>
                {medicineCount}
              </span>
            </div>
          </div>
        </div>

        {/* Follow-up Date */}
        {prescription.followUpDate && (
          <div className='mb-4'>
            <p className='text-sm text-gray-600'>Follow-up Date</p>
            <p className='font-medium text-gray-800'>
              {formatDate(prescription.followUpDate)}
            </p>
          </div>
        )}

        {/* General Instructions Preview */}
        {prescription.generalInstructions && (
          <div className='mb-4'>
            <p className='text-sm text-gray-600 mb-1'>Instructions</p>
            <p className='text-sm text-gray-700 line-clamp-2'>
              {prescription.generalInstructions}
            </p>
          </div>
        )}

        {/* View Prescription Button */}
        <button
          onClick={handleViewPrescription}
          className='w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        >
          <div className='flex items-center justify-center space-x-2'>
            <Eye className='w-5 h-5' />
            <span>View Prescription</span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className='bg-gray-50 px-6 py-3'>
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <div className='flex items-center space-x-2'>
            <Clock className='w-4 h-4' />
            <span>Created: {formatDate(prescription.createdAt)}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FileText className='w-4 h-4' />
            <span>Rx</span>
          </div>
        </div>
      </div>
    </div>
  )
}
