// src/components/Navbar/navConfig.js
import {
  Home,
  Users,
  Info,
  Mail,
  LayoutDashboard,
  BarChart3
} from 'lucide-react'

// Navigation configuration based on role
export const getNavItems = (role) => {
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

// Route helper functions
export const getDashboardRoute = (role) => {
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

export const getProfileRoute = (role) => {
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

export const getAppointmentsRoute = (role) => {
  return role === 'Patient' ? '/patient/appointments' : '/doctor/appointments'
}