// src/components/Navbar/NavigationMenu.jsx
import { NavLink } from 'react-router-dom'
import { getNavItems } from './navConfig'

export default function NavigationMenu({ role }) {
  const navItems = getNavItems(role)

  return (
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
  )
}