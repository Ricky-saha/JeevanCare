import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatientProfile } from '../../../Services/Operations/patientApi'
import LoadingPage from '../../components/all/LoadingPage'
import { formatDate } from '../../components/utils/FormatDate'

export default function PatientProfile () {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { profile, loading, error } = useSelector(state => state.patient)

  useEffect(() => {
    if (user?.id) dispatch(getPatientProfile(user.id))
  }, [dispatch, user?.id])

  if (loading) return <LoadingPage />
  if (error)
    return <div className='text-center text-red-500'>Error: {error}</div>

 

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent'>
          Doctor Profile
        </h1>

        <div className='space-y-8'>
          {/* Profile Header */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <div className='flex items-center space-x-6'>
              <img
                src={profile?.image || '/default-avatar.png'}
                alt='Profile'
                className='w-24 h-24 rounded-full object-cover'
                onError={e => (e.target.src = '/default-avatar.png')}
              />
              <div>
                <p className='text-2xl font-bold'>{profile?.name || 'N/A'}</p>
                <p className='text-green-600 text-lg'>Verified Patient</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <p className='text-xl font-bold mb-6'>Personal Information</p>

            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-blue-50 p-6 rounded-xl'>
                <p className='text-base text-blue-800 mb-2'>Email</p>
                <p className='font-medium text-lg'>
                  {profile?.email || 'Not provided'}
                </p>
              </div>

              <div className='bg-green-50 p-6 rounded-xl'>
                <p className='text-base text-green-800 mb-2'>Phone</p>
                <p className='font-medium text-lg'>
                  {profile?.phone || 'Not provided'}
                </p>
              </div>

              <div className='bg-purple-50 p-6 rounded-xl'>
                <p className='text-base text-purple-800 mb-2'>Address</p>
                <p className='font-medium text-lg'>
                  {profile?.address || 'Not provided'}
                </p>
              </div>

              <div className='bg-orange-50 p-6 rounded-xl'>
                <p className='text-base text-orange-800 mb-2'>Date of Birth</p>
                <p className='font-medium text-lg'>
                  {profile?.dob
                    ? formatDate(profile?.dob)
                    : 'Not provided'}
                </p>
              </div>

              <div className='bg-pink-50 p-6 rounded-xl'>
                <p className='text-base text-pink-800 mb-2'>Gender</p>
                <p className='font-medium text-lg'>
                  {profile?.gender || 'Not provided'}
                </p>
              </div>

              <div className='bg-gray-50 p-6 rounded-xl'>
                <p className='text-base text-gray-800 mb-2'>Account Type</p>
                <p className='font-medium text-lg'>
                  {user?.accountType || 'Patient'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
