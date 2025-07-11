// src/components/Navbar/Navbar.jsx
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { logoutUser } from '../../../Services/Operations/authApis'

// Import components
import Logo from './Logo'
import NavigationMenu from './NavigationMenu'
import ProfileDropdown from './ProfileDropDown'
import AuthButtons from './AuthButton'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const { isAuthenticated, user, role } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }

  return (
    <div className='bg-white shadow-lg border-b border-gray-200 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavigationMenu role={role} />

          {/* Right Side */}
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              // Profile Dropdown
              <ProfileDropdown 
                user={user} 
                role={role} 
                onLogout={handleLogout}
                navigate={navigate}
              />
            ) : (
              // Auth Buttons
              <AuthButtons navigate={navigate} />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300'
            >
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu 
          showMenu={showMenu} 
          role={role} 
          onMenuItemClick={() => setShowMenu(false)}
        />
      </div>
    </div>
  )
}