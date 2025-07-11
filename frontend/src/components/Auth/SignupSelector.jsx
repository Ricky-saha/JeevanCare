// src/components/Auth/SignupSelector.jsx
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'

const ROLES = [
  { 
    id: 'patient', 
    label: 'Patient', 
    icon: '👤', 
    description: 'Book appointments and manage your health records',
    color: 'blue'
  },
  { 
    id: 'doctor', 
    label: 'Doctor', 
    icon: '🩺', 
    description: 'Manage appointments and patient consultations',
    color: 'green'
  },
  { 
    id: 'admin', 
    label: 'Admin', 
    icon: '⚙️', 
    description: 'Manage the healthcare system and users',
    color: 'purple'
  }
]

export default function SignupSelector() {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'hover:border-blue-400 hover:bg-blue-50 hover:shadow-blue-100',
      green: 'hover:border-green-400 hover:bg-green-50 hover:shadow-green-100',
      purple: 'hover:border-purple-400 hover:bg-purple-50 hover:shadow-purple-100'
    }
    return colors[color] || colors.blue
  }

  return (
    <AuthLayout title="Join Jeevan Care" subtitle="Choose your role to get started">
      <div className="space-y-4">
        {ROLES.map((role) => (
          <Link
            key={role.id}
            to={`/signup/${role.id}`}
            className={`block p-6 border-2 border-gray-200 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${getColorClasses(role.color)}`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{role.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{role.label}</h3>
                <p className="text-gray-600 text-sm">{role.description}</p>
              </div>
              <div className="text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}