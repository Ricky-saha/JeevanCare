import React from 'react'
import { Pill, Info } from 'lucide-react'

const PrescriptionContent = ({ prescription }) => {
  return (
    <>
      {/* Medications */}
      <div className="px-8 py-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Pill className="w-6 h-6 mr-2 text-green-600" />
          Prescribed Medications ({prescription.medicines?.length || 0})
        </h3>
        
        <div className="space-y-4">
          {prescription.medicines?.map((medicine, index) => (
            <div key={medicine._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 print-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm print-colors">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">{medicine.name}</h4>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium print-colors">
                  {medicine.dosage}
                </span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Frequency</p>
                  <p className="text-gray-800 font-medium">{medicine.frequency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Duration</p>
                  <p className="text-gray-800 font-medium">{medicine.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Instructions</p>
                  <p className="text-gray-800">{medicine.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Instructions */}
      {prescription.generalInstructions && (
        <div className="px-8 py-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2 text-yellow-600" />
            General Instructions
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 print-colors">
            <p className="text-gray-800 leading-relaxed">{prescription.generalInstructions}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default PrescriptionContent