import React, { useState } from 'react'
import PrescriptionModal from './PrescriptionModal'
import PatientSummary from './PatientSummary'
import PatientRecords from './PatientRecord'

const PatientHistory = ({ data }) => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [showModal, setShowModal] = useState(false)

  if (!data) return null

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPrescription(null)
  }

  return (
    <div className='space-y-6'>
      <PatientSummary data={data} />
      
      {/* Tab Navigation */}
      <div className='flex space-x-1 bg-gray-100 rounded-lg p-1'>
        {[
          { key: 'appointments', label: 'Appointments', count: data.appointments?.length },
          { key: 'prescriptions', label: 'Prescriptions', count: data.prescriptions?.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label} ({tab.count || 0})
          </button>
        ))}
      </div>
      
      <div className='max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
        <PatientRecords 
          data={data} 
          activeTab={activeTab} 
          onViewPrescription={handleViewPrescription} 
        />
      </div>

      <PrescriptionModal
        selectedPrescription={selectedPrescription}
        patientData={data.patient}
        isOpen={showModal}
        onClose={closeModal}
      />
    </div>
  )
}

export default PatientHistory