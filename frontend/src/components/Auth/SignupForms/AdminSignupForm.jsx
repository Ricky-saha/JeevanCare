// src/components/Auth/SignupForms/AdminSignupForm.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'
import { signupAdmin } from '../../../../Services/Operations/authApis'
import AuthLayout from '../AuthLayout'

export default function AdminSignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      
      // Add all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'confirmPassword' && value !== undefined && value !== '') {
          if (key === 'image' && value[0]) {
            formData.append(key, value[0])
          } else if (key !== 'image') {
            formData.append(key, value)
          }
        }
      })

      await dispatch(signupAdmin(formData, navigate))
    } catch (error) {
      console.error('Admin signup error:', error)
    }
  }

  const InputField = ({ label, name, type = 'text', placeholder, validation, ...props }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        {...register(name, validation)}
        {...props}
      />
      {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>}
    </div>
  )

  return (
    <AuthLayout title="Create Admin Account" subtitle="Join as an administrator to manage the system">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            Personal Information
          </h3>
          
          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            validation={{ required: 'Name is required' }}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@jeevancare.com"
            validation={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            }}
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            validation={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits'
              }
            }}
          />
        </div>

        {/* Account Security */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
            Account Security
          </h3>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
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

          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
            Profile Picture (Optional)
          </h3>
          
          <InputField
            label="Profile Picture"
            name="image"
            type="file"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 outline-none transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Creating Account...
            </div>
          ) : (
            'Create Admin Account'
          )}
        </button>
      </form>

      {/* Navigation Links */}
      <div className="mt-8 flex justify-between items-center">
        <Link 
          to="/signup" 
          className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to role selection
        </Link>
        <Link 
          to="/login" 
          className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
        >
          Already have an account?
        </Link>
      </div>
    </AuthLayout>
  )
}