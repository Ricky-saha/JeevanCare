import React from 'react'
import { Calendar, Clock, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const AppointmentInfoCard = ({ appointment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointment Information</h2>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold ${getStatusColor(appointment.status)}`}>
          {getStatusIcon(appointment.status)}
          {appointment.status}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-800">{formatDate(appointment.appointmentDate)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-semibold text-gray-800">{appointment.timeSlot}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Consultation Fee</p>
              <p className="font-semibold text-gray-800">₹{appointment.fees}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${appointment.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className={`font-semibold ${appointment.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                {appointment.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentInfoCard