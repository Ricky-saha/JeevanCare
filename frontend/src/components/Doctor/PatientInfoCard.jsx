import React from 'react'
import { User, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import { formatDate } from '../utils/FormatDate'

const PatientInfoCard = ({ patient }) => {


  const formatAge = (dob) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear()
    return `${age} years`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Information</h2>
      
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-blue-200">
          <img
            src={patient.image}
            alt={patient.name}
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = '/default-patient.png'}
          />
        </div>
        
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-800">{patient.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{patient.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{patient.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-pink-600">👤</div>
              <div>
                <p className="text-sm text-gray-600">Gender & Age</p>
                <p className="font-semibold text-gray-800">
                  {patient.gender}, {formatAge(patient.dob)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold text-gray-800">{formatDate(patient.dob)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-gray-800">{patient.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientInfoCard