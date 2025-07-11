
import { useNavigate } from 'react-router-dom'

export default function RelatedDoctors({ doctors, currentDocInfo }) {
  console.log(doctors,currentDocInfo)
  const navigate = useNavigate()

const relatedDoctors = doctors
  .filter(doc => {
    const sameSpeciality = doc.speciality === currentDocInfo.speciality
    const differentId = doc.id !== currentDocInfo.id
    
    console.log(`Doctor: ${doc.name}`)
    console.log(`Doc ID: ${doc._id}`)
    console.log(`Current ID: ${currentDocInfo._id}`)
    console.log(`IDs equal: ${doc._id === currentDocInfo._id}`)
    console.log(`Same speciality: ${sameSpeciality}, Different ID: ${differentId}`)
    console.log('---')
    
    return sameSpeciality && differentId
  })
  .slice(0, 5)

    console.log("related one",relatedDoctors)
  if (relatedDoctors.length === 0) {
    return null
  }


  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 mt-6'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Related Doctors
        </h2>
        <p className='text-gray-600'>
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {relatedDoctors.map((doctor, index) => (
          <div
            key={doctor.id || index}
            className='bg-white border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-8px] transition-all duration-500 shadow-sm hover:shadow-xl group'
            onClick={() => {
              navigate(`/appointment/${doctor.id}`);
              window.scrollTo(0, 0);
            }}
          >
            <div className='w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden'>
              <img
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                src={doctor.image}
                alt={doctor.name}
                onError={(e) => {
                  e.target.src = '/placeholder-doctor.jpg' // fallback image
                }}
              />
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500 mb-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span>Available</span>
              </div>
              <h3 className='font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors'>
                {doctor.name}
              </h3>
              <p className='text-sm text-gray-600 mb-2'>
                {doctor.speciality}
              </p>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-800'>
                  ₹{doctor.fees}
                </span>
                <button 
                  className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors'
                 
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/appointment/${doctor._id}`)
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}