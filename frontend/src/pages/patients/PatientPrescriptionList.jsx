import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  User,
  FileText,
  CheckCircle,
  Check,
  Clock,
  Plus,
  Calendar,
  RefreshCw
} from 'lucide-react'
import { getPatientPrescriptions } from '../../../Services/Operations/patientApi'
import PrescriptionList from '../../components/Patient/PrescriptionList'
import { toast } from 'react-hot-toast'

export default function PatientPrescriptionList () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { prescriptions, loading, error } = useSelector(state => state.patient)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (user?.id) {
      dispatch(getPatientPrescriptions(user.id))
    } else {
      toast.error('Please login to view prescriptions')
    }
  }, [dispatch, isAuthenticated, user?.id, navigate])

  const getStatusCount = status => {
    return (
      prescriptions?.filter(p => p.status?.toLowerCase() === status).length || 0
    )
  }

  const statCards = [
    {
      label: 'Total',
      value: prescriptions?.length || 0,
      icon: FileText,
      color: 'blue'
    },
    {
      label: 'Active',
      value: getStatusCount('active'),
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Completed',
      value: getStatusCount('completed'),
      icon: Check,
      color: 'blue'
    }
  ]

  const actions = [
    {
      label: 'Book Appointment',
      icon: Plus,
      onClick: () => navigate('/doctors'),
      primary: true
    },
    {
      label: 'View Appointments',
      icon: Calendar,
      onClick: () => navigate('/patient/appointments')
    },
    {
      label: 'Refresh',
      icon: RefreshCw,
      onClick: () => window.location.reload()
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2'>
            My Prescriptions
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-4' />
          <p className='text-gray-600 text-lg'>
            View and manage all your medical prescriptions in one place
          </p>
        </div>

        {/* Patient Info */}
        {user && (
          <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
            <div className='flex items-center space-x-4'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center'>
                {
                   (user.image) ? <img src={user.image} alt="userImage" /> :<User className='w-8 h-8 text-white' />
                }
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                  {user.name || user.fullName || 'Patient'}
                </h2>
                <p className='text-gray-600'>{user.email}</p>
                <div className='flex items-center space-x-2 mt-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full' />
                  <span className='text-sm text-green-600 font-medium'>
                    Active Patient
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-9 mb-8'>
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center space-x-4'>
                <div
                  className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>{label}</p>
                  <p className='text-2xl font-bold text-gray-800'>{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                Quick Actions
              </h3>
              <p className='text-sm text-gray-600'>
                Manage your prescriptions easily
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              {actions.map(({ label, icon: Icon, onClick, primary }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className={`${
                    primary
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  } font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  <div className='flex items-center space-x-2'>
                    <Icon className='w-4 h-4' />
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        <PrescriptionList
          prescriptions={prescriptions || []}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}
