// src/components/Navbar/Logo.jsx
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets_frontend/assets'

export default function Logo() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/')}
      className='flex items-center space-x-3 cursor-pointer'
    >
      <div>
        <img className='w-50' src={assets.logo} alt='JeevanCare Logo' />
        <p className='bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent ml-9 text-sm'>
          Your life, our care 💙
        </p>
      </div>
    </div>
  )
}