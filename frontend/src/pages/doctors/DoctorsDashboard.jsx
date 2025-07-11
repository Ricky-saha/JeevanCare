import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Calendar,
  Clock,
  Users,
  FileText,
  DollarSign,
  Stethoscope,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import {
  getDoctorDashboard,
  getDoctorPrescriptions
} from '../../../Services/Operations/doctorApi'
import LoadingPage from '../../components/all/LoadingPage'
import ErrorPage from '../../components/all/ErrorPage'

const DoctorsDashboard = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)
  const { dashboard, prescriptions, loading, error } = useSelector(
    state => state.doctor
  )

  useEffect(() => {
    if (user?.id && token) {
      dispatch(getDoctorDashboard(user.id))
      dispatch(getDoctorPrescriptions(user.id))
    }
  }, [dispatch, user?.id, token])

  if (loading && !dashboard) return <LoadingPage />
  if (error && !dashboard) return <ErrorPage error={error} />

  const stats = dashboard?.stats
  const appointments = dashboard?.recentAppointments || []
  const doctorStatus = dashboard?.doctorStatus

  const getStatusStyle = status => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      active: 'bg-emerald-100 text-emerald-800'
    }
    return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const statsData = [
    {
      title: "Today's Appointments",
      value: stats?.todayAppointments,
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments,
      icon: Users,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Prescriptions',
      value: stats?.totalPrescriptions,
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Earnings',
      value: `₹${stats?.totalEarnings?.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-amber-500 to-orange-500'
    }
  ]

  const statusBadges = [
    {
      condition: doctorStatus?.available,
      text: doctorStatus?.available ? 'Available' : 'Not Available',
      className: doctorStatus?.available
        ? 'bg-green-50 text-green-700 border-green-200'
        : 'bg-red-50 text-red-700 border-red-200',
      dotColor: doctorStatus?.available ? 'bg-green-500' : 'bg-red-500'
    },
    {
      condition: doctorStatus?.verificationStatus,
      text: doctorStatus?.verificationStatus,
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: CheckCircle
    }
  ]

  const sections = [
    {
      title: 'Recent Appointments',
      subtitle: `${appointments.length} appointments`,
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-600',
      data: appointments,
      emptyText: 'No appointments today',
      emptySubtext: 'Your schedule is clear for now',
      renderItem: (apt, i) => (
        <div
          key={apt.appointmentId}
          className='flex items-center space-x-4 p-4 border-2 border-gray-100 rounded-xl hover:shadow-md transition-shadow'
        >
          <div className='relative'>
            <img
              src={
                apt.patientImage ||
                `https://ui-avatars.com/api/?name=${apt.patientName}&background=random`
              }
              className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg'
              alt={apt.patientName}
            />
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center'>
              <span className='text-xs text-white font-bold'>{i + 1}</span>
            </div>
          </div>
          <div className='flex-1'>
            <h3 className='font-bold text-lg text-gray-900'>
              {apt.patientName}
            </h3>
            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              {[
                {
                  icon: Calendar,
                  text: new Date(apt.appointmentDate).toLocaleDateString()
                },
                { icon: Clock, text: apt.timeSlot }
              ].map(({ icon: Icon, text }, idx) => (
                <span key={idx} className='flex items-center space-x-1'>
                  <Icon className='w-4 h-4' />
                  <span>{text}</span>
                </span>
              ))}
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
              apt.status
            )} border-2`}
          >
            {apt.status}
          </span>
        </div>
      )
    },
    {
      title: 'Recent Prescriptions',
      subtitle: `${prescriptions?.length || 0} prescriptions`,
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      data: prescriptions,
      emptyText: 'No prescriptions yet',
      emptySubtext: 'Start creating prescriptions for your patients',
      renderItem: (rx, i) => (
        <div
          key={rx.prescriptionId}
          className='flex items-center space-x-4 p-4 border-2 border-gray-100 rounded-xl hover:shadow-md transition-shadow'
        >
          <div className='relative'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
              <FileText className='w-6 h-6 text-white' />
            </div>
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center'>
              <span className='text-xs text-white font-bold'>{i + 1}</span>
            </div>
          </div>
          <div className='flex-1'>
            <h3 className='font-bold text-lg text-gray-900'>
              {rx.prescriptionNumber}
            </h3>
            <p className='text-gray-600 font-medium'>
              Patient: {rx.patientName}
            </p>
            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              <span>{rx.medicinesCount} medicines</span>
              <span>•</span>
              <span>{new Date(rx.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
              rx.status
            )} border-2`}
          >
            {rx.status}
          </span>
        </div>
      )
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-100'>
      {/* Header */}
      <div className='bg-white shadow-xl border-b px-8 py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg'>
              <Stethoscope className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent'>
              {user?.name || 'Doctor'}
            </h1>
          </div>

          {doctorStatus && (
            <div className='flex items-center space-x-4'>
              {statusBadges.map(
                (badge, i) =>
                  badge.condition && (
                    <div
                      key={i}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold shadow-lg border-2 ${badge.className}`}
                    >
                      {badge.dotColor && (
                        <div
                          className={`w-3 h-3 rounded-full ${badge.dotColor}`}
                        />
                      )}
                      {badge.icon && <badge.icon className='w-4 h-4' />}
                      <span>{badge.text}</span>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-8'>
        {/* Stats Grid */}
        {stats && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {statsData.map(({ title, value, icon: Icon, gradient }, i) => (
              <div
                key={i}
                className='bg-white p-6 rounded-2xl shadow-xl border border-gray-100'
              >
                <div className='flex justify-between items-center'>
                  <div className='flex-1'>
                    <p className='text-sm font-bold text-gray-600 uppercase tracking-wider mb-2'>
                      {title}
                    </p>
                    <p className='text-3xl font-bold text-gray-900 mb-2'>
                      {value}
                    </p>
                    <div className='flex items-center'>
                      <TrendingUp className='w-4 h-4 text-green-500 mr-2' />
                      <span className='text-sm font-semibold text-green-600'>
                        Active
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-4 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg`}
                  >
                    <Icon className='w-8 h-8 text-white' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
          {sections.map((section, idx) => (
            <div
              key={idx}
              className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'
            >
              <div
                className={`bg-gradient-to-r ${section.gradient} p-6 text-white`}
              >
                <div className='flex items-center space-x-3'>
                  <section.icon className='w-6 h-6' />
                  <div>
                    <h2 className='text-xl font-bold'>{section.title}</h2>
                    <p className='opacity-90'>{section.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className='p-6'>
                {section.data?.length > 0 ? (
                  <div className='space-y-4'>
                    {section.data
                      .slice(0, 4)
                      .map((item, i) => section.renderItem(item, i))}
                  </div>
                ) : (
                  <div className='text-center py-12'>
                    <section.icon className='w-16 h-16 mx-auto text-gray-300 mb-4' />
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {section.emptyText}
                    </h3>
                    <p className='text-gray-500'>{section.emptySubtext}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorsDashboard
