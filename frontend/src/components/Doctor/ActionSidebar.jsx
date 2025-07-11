import React, { useState } from 'react'
import { Edit3, CheckCircle, XCircle } from 'lucide-react'
import CreatePrescriptionModal from './CreatePrescriptionModal'

const ActionSidebar = ({
  onStatusUpdate,
  statusLoading,
  doctorId,
  patientId,
  appointmentId
}) => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [prescriptionCreated, setPrescriptionCreated] = useState(false)

  const handleCreatePrescription = () => {
    setShowPrescriptionModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          {!prescriptionCreated ? (
            // Show all buttons before prescription is created
            <>
              {/* Create Prescription */}
              <button
                onClick={handleCreatePrescription}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Edit3 className="w-4 h-4" />
                Create Prescription
              </button>

              {/* Status Update Buttons */}
              <button
                onClick={() => onStatusUpdate('Completed')}
                disabled={statusLoading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Complete
              </button>
              
              <button
                onClick={() => onStatusUpdate('Cancelled')}
                disabled={statusLoading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Cancel Appointment
              </button>
            </>
          ) : (
            // Show only Mark Complete button after prescription is created
            <button
              onClick={() => onStatusUpdate('Completed')}
              disabled={statusLoading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </button>
          )}
        </div>
      </div>
      
      {/* Create Prescription Modal */}
      {showPrescriptionModal && (
        <CreatePrescriptionModal
          isOpen={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          doctorId={doctorId}
          patientId={patientId}
          appointmentId={appointmentId}
          onSuccess={() => {
            setShowPrescriptionModal(false)
            setPrescriptionCreated(true)
          }}
        />
      )}
    </div>
  )
}

export default ActionSidebar