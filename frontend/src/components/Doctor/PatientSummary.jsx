import React from 'react'
import { Calendar, FileText, User } from 'lucide-react'

const PatientSummary = ({ data }) => {
  const StatsCard = ({ icon: Icon, value, label, color }) => (
    <div className={`${color} rounded-xl p-4 text-center shadow-lg text-white`}>
      <Icon className='w-6 h-6 mx-auto mb-2' />
      <p className='text-2xl font-bold'>{value}</p>
      <p className='text-sm opacity-90'>{label}</p>
    </div>
  )

  const stats = [
    {
      icon: Calendar,
      value: data.appointmentsCount,
      label: 'Appointments',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      value: data.prescriptionsCount,
      label: 'Prescriptions',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      icon: User,
      value: data.patient.gender,
      label: 'Gender',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      value: new Date().getFullYear() - new Date(data.patient.dob).getFullYear(),
      label: 'Age',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default PatientSummary