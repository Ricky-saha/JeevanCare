// components/AppointmentCard/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status, type = 'appointment' }) => {
  const getStatusStyles = () => {
    const normalizedStatus = status.toLowerCase();
    
    if (type === 'videoCall') {
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    }
    
    switch (normalizedStatus) {
      case 'confirmed':
      case 'scheduled':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border border-blue-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;