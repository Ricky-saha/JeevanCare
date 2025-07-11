// src/components/Navbar/ProfileDropdown.jsx
import { ChevronDown, LayoutDashboard, User, Calendar, LogOut } from 'lucide-react'
import { assets } from '../../assets/assets_frontend/assets'
import { getDashboardRoute, getProfileRoute, getAppointmentsRoute } from './navConfig'

export default function ProfileDropdown({ user, role, onLogout, navigate }) {
  return (
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
              onClick={onLogout}
              className='w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-300 flex items-center space-x-3'
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(getDashboardRoute(role))}
                className='w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-3'
              >
                <LayoutDashboard size={20} />
                {role === 'Doctor' ? <span>My Dashboard</span> : <span>My Prescriptions</span>}
              </button>

              <button
                onClick={() => navigate(getProfileRoute(role))}
                className='w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-3'
              >
                <User size={20} />
                <span>My Profile</span>
              </button>

              {/* Appointments - only for Patient and Doctor */}
              {(role === 'Patient' || role === 'Doctor') && (
                <button
                  onClick={() => navigate(getAppointmentsRoute(role))}
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
                  onClick={onLogout}
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
  )
}