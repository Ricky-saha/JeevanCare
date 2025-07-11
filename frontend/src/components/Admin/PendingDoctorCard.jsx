import React from 'react'
import { useDispatch } from 'react-redux'
import { 
  CheckCircle, 
  Trash2, 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Stethoscope,
  Calendar,
  DollarSign,
  CalendarCheck
} from 'lucide-react'
import { updateDoctorStatus, deleteDoctorAccount } from '../../../Services/Operations/adminApi'

const PendingDoctorCard = ({ doctor }) => {
  const dispatch = useDispatch()

  const handleApprove = (statuss) => {
    dispatch(updateDoctorStatus(doctor.id, statuss))
    console.log(statuss)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this doctor application?')) {
      dispatch(deleteDoctorAccount(doctor.id))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden bg-white">
              <img
                src={doctor.image || '/api/placeholder/64/64'}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                {doctor.name}
              </h3>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Stethoscope size={16} />
                {doctor.speciality}
              </p>
            </div>
          </div>

          {/* Doctor Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={16} className="text-blue-500" />
              <span className="text-sm">{doctor.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarCheck size={16} className="text-green-500" />
              <span className="text-sm">{formatDate(doctor.dob) || 'N/A'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-red-500" />
              <span className="text-sm">{doctor.address}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <GraduationCap size={16} className="text-purple-500" />
              <span className="text-sm">{doctor.degree}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} className="text-orange-500" />
              <span className="text-sm">{doctor.experience} years exp.</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign size={16} className="text-yellow-500" />
              <span className="text-sm">₹{doctor.fees}</span>
            </div>
          </div>

          {/* About Section */}
          {doctor.about && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">About</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {doctor.about}
              </p>
            </div>
          )}

          {/* Application Date */}
          <div className="text-xs text-gray-500">
            Applied on: {formatDate(doctor.createdAt)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-6">
          <button
            onClick={()=>handleApprove("Verified")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            <CheckCircle size={16} />
            Verify
          </button>

          <button
            onClick={()=>handleApprove("Rejected")}
            className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            <CheckCircle size={16} />
            Reject
          </button>
        
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 outline-none transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default PendingDoctorCard