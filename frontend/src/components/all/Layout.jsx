// src/components/Layout/Layout.jsx
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../all/Footer'

export default function Layout({ children }) {
  const location = useLocation()
  
  // Define routes where navbar and footer should be hidden
  const authRoutes = [
    '/login',
    '/signup',
    '/signup/patient',
    '/signup/doctor',
    '/signup/admin'
  ]
  
  // Check if current route is an auth route
  const isAuthRoute = authRoutes.includes(location.pathname)
  
  return (
    <div className={isAuthRoute ? '' : 'mx-4 sm:mx-[10%]'}>
      {/* Show Navbar only if not on auth routes */}
      {!isAuthRoute && <Navbar />}
      
      {/* Main content */}
      <main className={isAuthRoute ? 'min-h-screen' : ''}>
        {children}
      </main>
      
      {/* Show Footer only if not on auth routes */}
      {!isAuthRoute && <Footer />}
    </div>
  )
}