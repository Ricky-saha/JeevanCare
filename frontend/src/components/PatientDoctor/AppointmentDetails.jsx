// components/AppointmentCard/AppointmentDetails.jsx
import React from 'react';
import { formatDate } from '../utils/FormatDate';
import StatusBadge from './StatusBadge';

const AppointmentDetails = ({ appointment, personInfo, isVideoCallCompleted }) => {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {personInfo.name}
        </h3>
        <p className="text-blue-600 font-medium text-sm">
          {personInfo.speciality}
        </p>
        {personInfo.additionalInfo && (
          <p className="text-emerald-600 font-medium text-sm">
            {personInfo.additionalInfo}
          </p>
        )}
      </div>

      {/* Date & Time */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs font-medium text-blue-700 mb-1 uppercase tracking-wide">
          Date & Time
        </p>
        <p className="text-blue-800 font-semibold">
          {appointment.appointmentDate && appointment.timeSlot ? 
            `${formatDate(appointment.appointmentDate)} | ${appointment.timeSlot}` :
            'Date/Time not available'
          }
        </p>
      </div>

      {/* Status */}
      {appointment.status && (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <StatusBadge status={appointment.status} />
        </div>
      )}

      {/* Video Call Status Indicator */}
      {isVideoCallCompleted && (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">Consultation:</span>
          <StatusBadge status="Video Call Completed" type="videoCall" />
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;