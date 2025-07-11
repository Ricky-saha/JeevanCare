// components/AppointmentCard/ProfileSection.jsx
import React from 'react';

const ProfileSection = ({ personInfo, userRole }) => {
  return (
    <div className="flex-shrink-0">
      <div className="w-20 h-20 rounded-2xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
        <div className="w-full h-full rounded-xl overflow-hidden bg-white">
          <img
            src={personInfo.image}
            alt={personInfo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = userRole === 'Patient' 
                ? '/default-doctor.png' 
                : '/default-patient.png';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;