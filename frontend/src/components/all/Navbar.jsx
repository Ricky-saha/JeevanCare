// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { logoutUser } from '../../../Services/Operations/authApis'

// Lucide React Icons
import {
  Home,
  Users,
  Info,
  Mail,
  LayoutDashboard,
  BarChart3,
  User,
  Calendar,
  LogOut,
  ChevronDown,
  Menu,
  X,
  UserPlus
} from 'lucide-react'

export default function Navbar () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const { isAuthenticated, user, role } = useSelector(state => state.auth)

  // Navigation configuration based on role
  const getNavItems = () => {
    const homeItem = { to: '/', label: 'HOME', icon: Home }
    const aboutItem = { to: '/about', label: 'ABOUT', icon: Info }
    const contactItem = { to: '/contact', label: 'CONTACT', icon: Mail }

    switch (role) {
      case 'Doctor':
        return [
          {
            to: '/doctor/dashboard',
            label: 'DASHBOARD',
            icon: LayoutDashboard
          },
          aboutItem,
          contactItem
        ]

      case 'Admin':
        return [
          { to: '/admin/panel', label: 'PANEL', icon: BarChart3 },
          aboutItem,
          contactItem
        ]

      default: // Non-authenticated users and Patients
        return [
          homeItem,
          { to: '/doctors', label: 'ALL DOCTORS', icon: Users },
          aboutItem,
          contactItem
        ]
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }

  const getDashboardRoute = () => {
    switch (role) {
      case 'Patient':
        return '/patient/prescription'
      case 'Doctor':
        return '/doctor/dashboard'
      case 'Admin':
        return '/admin/panel'
      default:
        return '/'
    }
  }
  const getProfileRoute = () => {
    switch (role) {
      case 'Patient':
        return '/patient/profile'
      case 'Doctor':
        return '/doctor/profile'
      case 'Admin':
        return '/admin/profile'
      default:
        return '/'
    }
  }

  const getAppointmentsRoute = () => {
    return role === 'Patient' ? '/patient/appointments' : '/doctor/appointments'
  }

  const navItems = getNavItems()

  return (
    <div className='bg-white shadow-lg border-b border-gray-200 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-8'>
            {navItems.map(item => {
              const IconComponent = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 to-green-600 shadow-lg transform scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`
                  }
                >
                  <div className='flex items-center space-x-2'>
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              )
            })}
          </nav>

          {/* Right Side */}
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              // Profile Dropdown
              <div className='relative group'>
                <div className='flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300'>
                  <div className='w-10 h-10 rounded-full border-2 border-gradient-to-r from-blue-500 to-green-500 overflow-hidden'>
                    <img
                      src={user?.image || assets.profile_pic}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='hidden md:block'>
                    <p className='text-sm font-medium text-gray-700'>
                      {user?.name || 'User'}
                    </p>
                    <p className='text-xs text-gray-500'>{role}</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'
                  />
                </div>

                {/* Dropdown Menu */}
                <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50'>
                  {/* Profile Header */}
                  <div className='p-4 border-b border-gray-100'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-12 h-12 rounded-full border-2 border-gradient-to-r from-blue-500 to-green-500 overflow-hidden'>
                        <img
                          src={user?.image || assets.profile_pic}
                          alt='Profile'
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>
                          {user?.name || 'User'}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className='p-2'>
                    {/* For Admin role - only show logout */}
                    {role === 'Admin' ? (
                      <button
                        onClick={handleLogout}
                        className='w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-300 flex items-center space-x-3'
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate(getDashboardRoute())}
                          className='w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-3'
                        >
                          <LayoutDashboard size={20} />
                          {role === 'Doctor' ? <span>My Dashboard</span> : <span>My Prescriptions</span>}
                        </button>

                        <button
                          onClick={() => navigate(getProfileRoute())}
                          className='w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-3'
                        >
                          <User size={20} />
                          <span>My Profile</span>
                        </button>

                        {/* Appointments - only for Patient and Doctor */}
                        {(role === 'Patient' || role === 'Doctor') && (
                          <button
                            onClick={() => navigate(getAppointmentsRoute())}
                            className='w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-300 flex items-center space-x-3'
                          >
                            <Calendar size={20} />
                            <span>
                              {role === 'Patient'
                                ? 'My Appointments'
                                : 'Patient Appointments'}
                            </span>
                          </button>
                        )}

                        {/* Logout */}
                        <div className='border-t border-gray-100 mt-2 pt-2'>
                          <button
                            onClick={handleLogout}
                            className='w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-300 flex items-center space-x-3'
                          >
                            <LogOut size={20} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Auth Buttons
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
        {showMenu && (
          <div className='lg:hidden py-4 border-t border-gray-200'>
            <nav className='flex flex-col space-y-2'>
              {navItems.map(item => {
                const IconComponent = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-600 to-green-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`
                    }
                  >
                    <div className='flex items-center space-x-3'>
                      <IconComponent size={20} />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}