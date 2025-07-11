import { assets } from '../../assets/assets_frontend/assets'

export default function DoctorProfileCard ({ docInfo }) {
  return (
    <div className='bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-95'>
      {/* Header with cover image */}
      <div className='h-32 relative'>
        <div className='h-full overflow-hidden'>
          <img
            src={assets.cover_img}
            alt='Cover'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20'></div>
        </div>
        <div className='absolute -bottom-16 left-8'>
          <div className='w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 p-1'>
            <div className='w-full h-full rounded-full overflow-hidden bg-white shadow-inner'>
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='pt-20 pb-8 px-8'>
        {/* Doctor Info */}
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-2'>
            <h1 className='text-3xl font-bold text-gray-800'>{docInfo.name}</h1>
            <img
              src={assets.verified_icon}
              alt='verified'
              className='w-6 h-6'
            />
          </div>

          <div className='flex flex-wrap items-center gap-4 mb-4'>
            <div className='bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium'>
              {docInfo.degree}
            </div>
            <div className='bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
              {docInfo.speciality}
            </div>
            <div className='bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium'>
              {docInfo.experience}
            </div>
          </div>

          {/* Consultation Fee */}
          <div className='flex items-center gap-2 mb-6'>
            <span className='text-gray-600'>Consultation Fee:</span>
            <span className='text-2xl font-bold text-green-600'>
              ₹{docInfo.fees}
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className='bg-gray-50 rounded-xl p-6 mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              About Doctor
            </h2>
            <img
              src={assets.info_icon}
              alt='info'
              className='w-5 h-5 text-gray-500'
            />
          </div>
          <p className='text-gray-700 leading-relaxed'>{docInfo.about}</p>
        </div>

        {/* Contact Information */}
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='bg-blue-50 rounded-xl p-6'>
            <h3 className='font-semibold text-blue-800 mb-2'>Address</h3>
            <p className='text-gray-700'>{docInfo.address}</p>
          </div>
          <div className='bg-green-50 rounded-xl p-6'>
            <h3 className='font-semibold text-green-800 mb-2'>Availability</h3>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-green-700 font-medium'>
                Available for appointments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
