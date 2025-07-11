// src/components/Navbar/MobileMenu.jsx
import { NavLink } from 'react-router-dom'
import { getNavItems } from './navConfig'

export default function MobileMenu({ showMenu, role, onMenuItemClick }) {
  const navItems = getNavItems(role)

  if (!showMenu) return null

  return (
    <div className='lg:hidden py-4 border-t border-gray-200'>
      <nav className='flex flex-col space-y-2'>
        {navItems.map(item => {
          const IconComponent = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMenuItemClick}
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
  )
}