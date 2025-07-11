import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { loginPatient, loginDoctor, loginAdmin } from '../../../Services/Operations/authApis'
import AuthLayout from './AuthLayout'

const ROLES = [
  { id: 'Patient', label: 'Patient', icon: '👤', color: 'blue' },
  { id: 'Doctor', label: 'Doctor', icon: '🩺', color: 'green' },
  { id: 'Admin', label: 'Admin', icon: '⚙️', color: 'purple' }
]

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState('Patient')
  const [showPassword, setShowPassword] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const loginActions = {
    Patient: (email, password) => dispatch(loginPatient(email, password, navigate)),
    Doctor: (email, password) => dispatch(loginDoctor(email, password, navigate)),
    Admin: (email, password) => dispatch(loginAdmin(email, password, navigate))
  }

  const onSubmit = async (data) => {
    try {
      await loginActions[selectedRole](data.email, data.password)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const getRoleColorClass = (role, isSelected) => {
    const colors = {
      blue: isSelected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300',
      green: isSelected ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-green-300',
      purple: isSelected ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300 hover:border-purple-300'
    }
    return colors[ROLES.find(r => r.id === role)?.color || 'blue']
  }

  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to your healthcare journey">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Role Selection */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4">I am a</label>
          <div className="grid grid-cols-3 gap-3">
            {ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-xl border-2 font-medium transition-all duration-200 transform hover:scale-105 ${
                  getRoleColorClass(role.id, selectedRole === role.id)
                }`}
              >
                <div className="text-2xl mb-2">{role.icon}</div>
                <div className="text-sm">{role.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-4 focus:ring-blue-200 outline-none transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Signing in...
            </div>
          ) : (
            `Sign in as ${selectedRole}`
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            Create new account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}