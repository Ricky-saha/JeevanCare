// src/components/Navbar/AuthButtons.jsx
import { UserPlus } from 'lucide-react'

export default function AuthButtons({ navigate }) {
  return (
    <div className='flex items-center space-x-3'>
      <button
        onClick={() => navigate('/login')}
        className='text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300'
      >
        Sign In
      </button>
      <button
        onClick={() => navigate('/signup')}
        className='bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
      >
        <div className='flex items-center space-x-2'>
          <UserPlus size={16} />
          <span>Sign Up</span>
        </div>
      </button>
    </div>
  )
}