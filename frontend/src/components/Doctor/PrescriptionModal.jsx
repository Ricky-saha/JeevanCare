import React from 'react'
import {
  FileText,
  X,
  Printer,
  User,
  Calendar,
  Pill,
  AlertCircle
} from 'lucide-react'
import { formatDate } from '../utils/FormatDate'

const PrescriptionModal = ({
  selectedPrescription,
  patientData,
  isOpen,
  onClose
}) => {
  if (!isOpen || !selectedPrescription) return null


  return (
    <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white/95 backdrop-blur-md rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-500 rounded-lg shadow-lg'>
              <FileText className='w-6 h-6 text-white' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-800'>
                Prescription #{selectedPrescription.prescriptionId}
              </h2>
              <p className='text-sm text-gray-600'>
                {formatDate(selectedPrescription.createdAt)}
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => window.print()}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              <Printer className='w-4 h-4' />
              Print
            </button>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-200/80 rounded-lg transition-colors duration-200'
            >
              <X className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Doctor & Patient Info */}
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 shadow-sm'>
              <h3 className='font-semibold text-blue-800 mb-3 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Doctor
              </h3>
              <p className='font-bold text-gray-800'>
                {selectedPrescription.doctorId?.name}
              </p>
              <p className='text-sm text-blue-700 mt-1'>
                {selectedPrescription.doctorId?.speciality}
              </p>
            </div>

            <div className='p-4 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl border border-green-200/50 shadow-sm'>
              <h3 className='font-semibold text-green-800 mb-3 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Patient
              </h3>
              <p className='font-bold text-gray-800'>{patientData.name}</p>
              <p className='text-sm text-gray-600 mt-1'>
                {patientData.phone} • {patientData.email}
              </p>
              <p className='text-sm text-gray-600'>
                Age:{' '}
                {new Date().getFullYear() -
                  new Date(patientData.dob).getFullYear()}
                , {patientData.gender}
              </p>
            </div>
          </div>

          {/* Prescription Info */}
          <div className='flex flex-wrap gap-4 text-sm bg-gray-50/80 p-4 rounded-xl border border-gray-200/50'>
            <div className='flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg'>
              <Calendar className='w-4 h-4 text-purple-500' />
              <span className='font-medium'>
                Prescribed: {formatDate(selectedPrescription.createdAt)}
              </span>
            </div>
            {selectedPrescription.followUpDate && (
              <div className='flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg'>
                <Calendar className='w-4 h-4 text-orange-500' />
                <span className='font-medium'>
                  Follow-up: {formatDate(selectedPrescription.followUpDate)}
                </span>
              </div>
            )}
            <button
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedPrescription.status === 'Active'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {selectedPrescription.status}
            </button>
          </div>

          {/* Medicines */}
          <div className='bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200/50 shadow-sm'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-blue-500 rounded-lg'>
                <Pill className='w-5 h-5 text-white' />
              </div>
              <h3 className='text-lg font-bold text-gray-800'>Medicines</h3>
            </div>

            <div className='space-y-4'>
              {selectedPrescription.medicines?.map((medicine, index) => (
                <div
                  key={index}
                  className='p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                    <div className='space-y-1'>
                      <p className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
                        Name
                      </p>
                      <p className='font-bold text-gray-800'>{medicine.name}</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
                        Dosage
                      </p>
                      <p className='font-semibold text-blue-600'>
                        {medicine.dosage}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
                        Frequency
                      </p>
                      <p className='font-semibold text-green-600'>
                        {medicine.frequency}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
                        Duration
                      </p>
                      <p className='font-semibold text-purple-600'>
                        {medicine.duration}
                      </p>
                    </div>
                  </div>
                  {medicine.instructions && (
                    <div className='mt-3 p-3 bg-amber-50/80 border border-amber-200/50 rounded-lg'>
                      <p className='text-sm text-amber-800'>
                        <span className='font-semibold'>Instructions:</span>{' '}
                        {medicine.instructions}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* General Instructions */}
          {selectedPrescription.generalInstructions && (
            <div className='p-4 bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200/50 rounded-xl shadow-sm'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='p-1.5 bg-yellow-500 rounded-lg'>
                  <AlertCircle className='w-4 h-4 text-white' />
                </div>
                <h3 className='font-semibold text-yellow-800'>
                  General Instructions
                </h3>
              </div>
              <p className='text-yellow-800 text-sm leading-relaxed'>
                {selectedPrescription.generalInstructions}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className='pt-4 border-t border-gray-200/50 text-center'>
            <p className='text-xs text-gray-500'>
              Please follow the prescribed medications and instructions
              carefully
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionModal
