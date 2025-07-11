// src/components/Auth/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingPage from './LoadingPage'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  // Show loading while checking authentication
  if (loading) {
    return (
      <LoadingPage/>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Get appropriate dashboard route based on user's actual role
    const getDashboardRoute = () => {
      switch (role) {
        case 'Patient':
          return '/patient/prescription'  // Fixed route
        case 'Doctor':
          return '/doctor/dashboard'
        case 'Admin':
          return '/admin/panel'          // Fixed route
        default:
          return '/'
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Required role: {allowedRoles.join(' or ')} | Your role: {role}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.href = getDashboardRoute()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return children
}