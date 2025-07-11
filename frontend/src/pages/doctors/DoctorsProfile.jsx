import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDoctorProfile,
  updateAvailability
} from '../../../Services/Operations/doctorApi'
import LoadingPage from '../../components/all/LoadingPage'
import ErrorPage from '../../components/all/ErrorPage'
import {formatDate} from '../../components/utils/FormatDate.js'

export default function DoctorProfile () {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { profile, loading, error } = useSelector(state => state.doctor)
  const [availability, setAvailability] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  // Fetch doctor profile
  useEffect(() => {
    if (user?.id) {
      dispatch(getDoctorProfile(user.id))
    }
  }, [dispatch, user?.id])

  // Update availability state when profile changes
  useEffect(() => {
    if (profile?.available !== undefined) {
      setAvailability(Boolean(profile.available))
    }
  }, [profile?.available])

  const handleToggleAvailability = async () => {
    if (isToggling || !user?.id) return

    setIsToggling(true)
    const newAvailability = !availability

    try {
      await dispatch(updateAvailability(user.id, newAvailability))
      setAvailability(newAvailability)
    } catch (error) {
      console.error('Error updating availability:', error)
      setAvailability(availability)
    } finally {
      setIsToggling(false)
    }
  }
  //  console.log(profile)
  //  console.log(profile.dob)
  // // console.log(formatDate(profile?.dob))

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage error={error} />
  if (!profile) return <ErrorPage error='Profile data not found' />

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent'>
          Doctor Profile
        </h1>

        <div className='space-y-8'>
          {/* Profile Header */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                <img
                  src={profile.image || '/default-avatar.png'}
                  alt='Profile'
                  className='w-24 h-24 rounded-full object-cover'
                  onError={e => (e.target.src = '/default-avatar.png')}
                />
                <div>
                  <p className='text-2xl font-bold'>{profile.name || 'N/A'}</p>
                  <p className='text-green-600 text-lg'>
                    {profile.status || 'Pending'} Doctor
                  </p>
                  <p className='text-gray-600'>
                    {profile.speciality || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm'>
                <div className='flex flex-col items-center space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        availability ? 'bg-green-500' : 'bg-red-500'
                      } shadow-lg`}
                    />
                    <p className='text-sm font-medium text-gray-700'>
                      Current Status
                    </p>
                  </div>

                  <button
                    onClick={handleToggleAvailability}
                    disabled={isToggling}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 cursor-pointer ${
                      isToggling
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : availability
                        ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
                    }`}
                  >
                    {isToggling ? (
                      <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin'></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      `${availability ? '✓ Available' : '✗ Unavailable'}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <p className='text-xl font-bold mb-6'>Professional Information</p>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-blue-50 p-6 rounded-xl'>
                <p className='text-base text-blue-800 mb-2'>Email</p>
                <p className='font-medium text-lg'>
                  {profile?.email || 'Not provided'}
                </p>
              </div>

              <div className='bg-green-50 p-6 rounded-xl'>
                <p className='text-base text-green-800 mb-2'>Speciality</p>
                <p className='font-medium text-lg'>
                  {profile?.speciality || 'Not specified'}
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
                  {formatDate(profile?.dob)}
                </p>
              </div>

              <div className='bg-pink-50 p-6 rounded-xl'>
                <p className='text-base text-pink-800 mb-2'>Degree</p>
                <p className='font-medium text-lg'>
                  {profile?.degree || 'Not specified'}
                </p>
              </div>

              <div className='bg-indigo-50 p-6 rounded-xl'>
                <p className='text-base text-indigo-800 mb-2'>Experience</p>
                <p className='font-medium text-lg'>
                  {profile?.experience || 'Not specified'}
                </p>
              </div>

              <div className='bg-emerald-50 p-6 rounded-xl'>
                <p className='text-base text-emerald-800 mb-2'>
                  Consultation Fees
                </p>
                <p className='font-medium text-lg'>₹{profile?.fees || '0'}</p>
              </div>

              <div className='bg-rose-50 p-6 rounded-xl'>
                <p className='text-base text-rose-800 mb-2'>About</p>
                <p className='font-medium text-lg'>
                  {profile?.about || 'No information provided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
