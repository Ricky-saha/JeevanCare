import React from 'react'
import { User, UserCheck } from 'lucide-react'
import { assets } from '../../assets/assets_frontend/assets'
import { formatDate } from '../utils/FormatDate'

const PrescriptionHeader = ({ prescription, user}) => {
  return (
    <>
      {/* Clinic Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6 print-header print-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={assets.logo} alt="JeevanCare Logo" className="h-12 w-auto" />
            <div className="text-white">
              <h1 className="text-2xl font-bold">JeevanCare</h1>
              <p className="text-blue-100 text-sm">Your life, our care 💙</p>
            </div>
          </div>
          <div className="text-right text-white text-sm">
            <p>📧 life@jeevancare.com</p>
            <p>📞 +91 935472XXXX</p>
            <p>📍 Janakpuri, New Delhi</p>
          </div>
        </div>
      </div>

      {/* Prescription Info */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Medical Prescription</h2>
            <p className="text-gray-600">ID: <span className="font-semibold text-gray-800">{prescription.prescriptionId}</span></p>
          </div>
          <div className={`px-4 py-2 rounded-full border ${prescription.status === 'Active' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
            <span className="font-semibold text-sm">{prescription.status}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Date: {formatDate(prescription.appointmentId?.appointmentDate)} | Time: {prescription.appointmentId?.timeSlot}
        </div>
      </div>

      {/* Doctor & Patient Info */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
              Doctor Information
            </h3>
            <div className="flex items-center space-x-4">
              <img
                src={prescription.doctorId?.image}
                alt={prescription.doctorId?.name}
                className="w-16 h-16 rounded-full border-4 border-blue-200 object-cover"
                onError={(e) => e.target.src = '/api/placeholder/64/64'}
              />
              <div>
                <p className="font-semibold text-gray-800 text-lg">{prescription.doctorId?.name}</p>
                <p className="text-blue-600 font-medium">{prescription.doctorId?.speciality}</p>
                <p className="text-gray-600 text-sm">{prescription.doctorId?.email}</p>
              </div>
            </div>
          </div>

          {/* Patient */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Patient Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-800"><span className="font-medium">Name:</span> {user?.name || user?.fullName || 'Patient'}</p>
              <p className="text-gray-800"><span className="font-medium">Email:</span> {user?.email}</p>
              <p className="text-gray-800"><span className="font-medium">Patient ID:</span> {prescription.patientId}</p>
              <p className="text-gray-800"><span className="font-medium">Date:</span> {formatDate(prescription.appointmentId?.appointmentDate)}</p>
              <p className="text-gray-800"><span className="font-medium">Fee:</span> ₹{prescription.appointmentId?.fees}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrescriptionHeader