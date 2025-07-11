import { assets } from '../../assets/assets_frontend/assets'

export default function Header() {
  return (
    <>
      <div className='relative flex flex-col md:flex-row items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 rounded-3xl px-6 md:px-12 lg:px-20 mt-5 overflow-hidden shadow-2xl border border-blue-100'>
        {/* Background pattern */}
        <div className='absolute inset-0 opacity-8'>
          <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl'></div>
          <div className='absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full blur-xl'></div>
          <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-xl'></div>
        </div>
        
        {/* Left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-8 md:py-10 relative z-10'>
          <div className='space-y-4'>
            {/* JeevanCare Trust badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm'>
              <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full'></div>
              <span className='bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent text-sm font-medium'>
                JeevanCare - Trusted Healthcare Partner
              </span>
            </div>
            
            {/* Main heading with signature gradient */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
              Book Appointment
              <span className='block bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent'>
                With Trusted Doctors
              </span>
              <span className='text-gray-700 text-xl md:text-2xl lg:text-3xl font-normal block mt-1'>
                Anytime, Anywhere
              </span>
            </h1>
            
            {/* Description */}
            <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-md'>
              Experience seamless healthcare with our verified doctors and instant booking system. 
              <span className='bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent font-semibold'>
                Your health, our priority.
              </span>
            </p>
          </div>
          
          {/* Stats row with gradient elements */}
          <div className='flex items-center gap-8 text-sm text-gray-500'>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-1'>
                <span className='text-white text-xs'><img src={assets.group_profiles} alt="" /></span>
              </div>
              <span className='ml-2 font-medium text-gray-700'>1000+ Doctors</span>
            </div>
            
            <div className='flex items-center gap-2'>
              <div className='flex text-yellow-400'>
                {[1,2,3,4,5].map(i => (
                  <span key={i} className='text-sm'>⭐</span>
                ))}
              </div>
              <span className='font-medium text-gray-700'>4.8 Rating</span>
            </div>
          </div>
          
          {/* CTA buttons with JeevanCare signature gradient */}
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
            <a
              href='#speciality'
              className='group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 text-white px-6 py-3 rounded-2xl text-base font-semibold hover:from-blue-700 hover:via-cyan-700 hover:to-green-700 hover:shadow-lg transition-all duration-300 shadow-md relative overflow-hidden'
            >
              <span className='relative z-10'>Book Appointment</span>
              <img 
                className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10' 
                src={assets.arrow_icon}
                alt='arrow'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </a>
            
            <button className='flex items-center justify-center gap-3 bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 rounded-2xl text-base font-semibold border-2 border-transparent bg-gradient-to-r from-blue-200 to-green-200 bg-origin-border hover:from-blue-300 hover:to-green-300 transition-all duration-300 relative'>
              <span className='absolute inset-0 bg-white rounded-2xl m-0.5'></span>
              <span className='relative z-10 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>📞</span>
              <span className='relative z-10 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>Emergency Call</span>
            </button>
          </div>
          
          {/* Features with gradient accents */}
          <div className='flex flex-wrap gap-4 text-sm'>
            <div className='flex items-center gap-2 text-gray-600'>
              <div className='w-5 h-5 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-xs'>✓</span>
              </div>
              <span>Instant Booking</span>
            </div>
            <div className='flex items-center gap-2 text-gray-600'>
              <div className='w-5 h-5 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-xs'>🔒</span>
              </div>
              <span>Secure & Private</span>
            </div>
            <div className='flex items-center gap-2 text-gray-600'>
              <div className='w-5 h-5 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-xs'>💳</span>
              </div>
              <span>Insurance Accepted</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Enhanced image background */}
        <div className='md:w-1/2 relative flex items-center justify-center py-6 md:py-8'>
          {/* Enhanced background elements for image section */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-green-100/30 rounded-3xl'></div>
          <div className='absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse'></div>
          <div className='absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000'></div>
          <div className='absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-green-400/30 rounded-full blur-xl'></div>
          
          <div className='relative w-full max-w-md z-10'>
            {/* Main image container with enhanced gradient border and backdrop */}
            <div className='relative'>
              {/* Backdrop with multiple gradient layers */}
              <div className='absolute -inset-2 bg-gradient-to-br from-blue-200/40 via-cyan-200/40 to-green-200/40 rounded-2xl blur-lg'></div>
              <div className='absolute -inset-1 bg-gradient-to-br from-blue-300/30 via-cyan-300/30 to-green-300/30 rounded-2xl blur-md'></div>
              
              {/* Main container with glassmorphism effect */}
              <div className='relative bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-sm rounded-2xl p-0.5 shadow-xl border border-white/50'>
                <div className='bg-gradient-to-br from-blue-50/50 to-green-50/50 rounded-2xl p-2 shadow-lg border border-blue-100/50'>
                  <img
                    className='w-full h-auto object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-500'
                    src={assets.header_img}
                    alt='header_img'
                  />
                </div>
              </div>
              
              {/* Floating cards with signature gradient */}
              <div className='absolute -top-2 -right-2 bg-gradient-to-br from-blue-600 to-green-600 text-white p-2 rounded-xl shadow-lg backdrop-blur-sm'>
                <div className='text-center'>
                  <div className='text-sm font-bold'>24/7</div>
                  <div className='text-xs opacity-90'>Available</div>
                </div>
              </div>
              
              <div className='absolute -bottom-2 -left-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-blue-100/50'>
                <div className='flex items-center gap-1.5'>
                  <div className='w-6 h-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md'>
                    <span className='text-white text-xs'>👩‍⚕️</span>
                  </div>
                  <div>
                    <div className='text-xs font-semibold text-gray-800'>Dr. Aman</div>
                    <div className='text-xs text-gray-600'>Cardiologist</div>
                  </div>
                  <div className='w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-sm'></div>
                </div>
              </div>
              
              <div className='absolute top-1/2 -right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-md border border-blue-100/50 transform -translate-y-1/2'>
                <div className='text-center'>
                  <div className='text-yellow-400 text-sm'>⭐</div>
                  <div className='text-xs font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>4.9</div>
                </div>
              </div>
              
              <div className='absolute top-1/4 -left-3 bg-gradient-to-br from-green-500 to-blue-500 text-white p-1.5 rounded-lg shadow-md backdrop-blur-sm'>
                <div className='text-center'>
                  <div className='text-sm'>✓</div>
                  <div className='text-xs'>Verified</div>
                </div>
              </div>
            </div>
            
            {/* Bottom appointment card with enhanced gradient accent */}
            <div className='mt-3 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-blue-100/50'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-7 h-7 bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-md'>
                    <span className='text-white text-xs'>👨‍⚕️</span>
                  </div>
                  <div>
                    <div className='text-xs font-semibold text-gray-800'>Next Available</div>
                    <div className='text-xs text-gray-600'>Today 2:30 PM</div>
                  </div>
                </div>
                <div className='bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300'>
                  Book Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}