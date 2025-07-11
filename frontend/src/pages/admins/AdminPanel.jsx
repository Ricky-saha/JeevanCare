
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Users, Clock, AlertCircle } from 'lucide-react'
import { getPendingDoctors } from '../../../Services/Operations/adminApi'
import PendingDoctorCard from '../../components/Admin/PendingDoctorCard'
import CreateDoctorModal from '../../components/Admin/CreateDoctorModal'
import LoadingPage from '../../components/all/LoadingPage'
import ErrorPage from '../../components/all/ErrorPage'

const AdminPanel = () => {
  const dispatch = useDispatch()
  const { pendingDoctors, loading, error } = useSelector(state => state.admin)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    dispatch(getPendingDoctors())
  }, [dispatch])

  const handleCreateDoctor = () => {
    setShowCreateModal(true)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
  }

  const handleDoctorCreated = () => {
    setShowCreateModal(false)
    // Refresh pending doctors list
    dispatch(getPendingDoctors())
  }

  if (loading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage error={error} />
  } 

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="text-blue-600" size={32} />
                Admin Panel
              </h1>
              <p className="text-gray-600 mt-2">
                Manage doctor applications and platform administration
              </p>
            </div>
            
            <button
              onClick={handleCreateDoctor}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Doctor
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{pendingDoctors.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Doctors Section */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="text-blue-600" size={24} />
              Pending Doctor Applications
            </h2>
            <p className="text-gray-600 mt-1">
              Review and approve doctor registration requests
            </p>
          </div>

          <div className="p-6">
            {pendingDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Pending Applications
                </h3>
                <p className="text-gray-600">
                  All doctor applications have been reviewed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDoctors.map((doctor) => (
                  <PendingDoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Doctor Modal */}
        {showCreateModal && (
          <CreateDoctorModal
            onClose={handleCloseModal}
            onDoctorCreated={handleDoctorCreated}
          />
        )}
      </div>
    </div>
  )
}

export default AdminPanel