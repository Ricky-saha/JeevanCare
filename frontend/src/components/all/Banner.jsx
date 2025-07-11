import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets_frontend/assets'

export default function Banner() {
  const navigate = useNavigate()
  
  return (
    <div className='flex bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-2xl border border-blue-100 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10'></div>
      <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-transparent rounded-full blur-3xl'></div>
      
      {/* left side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 relative z-10'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold mb-6'>
          <p className='bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent'>
            Book Appointment
          </p>
          <p className='bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent'>
            With 100+ Trusted Doctors
          </p>
        </div>
        
        <p className='text-gray-600 text-base md:text-lg mb-8 max-w-md leading-relaxed'>
          Join thousands of satisfied patients who trust our verified doctors for their healthcare needs.
        </p>
        
        <button
          className='bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:via-cyan-700 hover:to-green-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 shadow-lg relative overflow-hidden group'
          onClick={() => {
            navigate('/login')
            scrollTo(0, 0)
          }}
        >
          <span className='relative z-10'>Create Account</span>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </button>
      </div>
      
      {/* right side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        {/* Decorative elements around image */}
        <div className='absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 blur-xl'></div>
        <div className='absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-400 rounded-full opacity-20 blur-xl'></div>
        
        <img
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500'
          src={assets.appointment_img}
          alt='appointment_image'
        />
      </div>
    </div>
  )
}