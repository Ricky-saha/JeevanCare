import React from 'react'
import { Calendar, Phone } from 'lucide-react'
import { formatDate } from '../utils/FormatDate'

const PrescriptionFooter = ({ prescription }) => {
  return (
    <div className="px-8 py-6">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Follow-up Date */}
        {prescription.followUpDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 print-colors">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Follow-up Appointment
            </h4>
            <p className="text-blue-700 font-medium">{formatDate(prescription.followUpDate)}</p>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 print-colors">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Emergency Contact
          </h4>
          <p className="text-red-700 font-medium">+91 9354725XXXX</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-gray-200">
        <p className="text-gray-600 text-sm mb-2">
          This prescription is valid for medical purposes only. Please consult your doctor before making any changes.
        </p>
        <p className="text-gray-500 text-xs">
          Generated on {formatDate(new Date())} | JeevanCare - Your life, our care💙
        </p>
      </div>
    </div>
  )
}

export default PrescriptionFooter