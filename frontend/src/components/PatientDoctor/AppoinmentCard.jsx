// components/AppointmentCard/AppointmentCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCall from '../VideoCall/VideoCall';
import ProfileSection from './ProfileSection';
import AppointmentDetails from './AppointmentDetails';
import ActionButtons from './ActionButtons';
import { getPersonInfo, getPaymentStatus } from './utils';

const AppointmentCard = ({ 
  appointment, 
  userRole, 
  onPayment, 
  onVideoCall,
  completedVideoCalls = []
}) => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const navigate = useNavigate();
  
  const appointmentId = appointment.appointmentId || appointment.id;
  const isVideoCallCompleted = completedVideoCalls.includes(appointmentId);
  const isPaid = getPaymentStatus(appointment);
  const personInfo = getPersonInfo(appointment, userRole);

  const handleVideoCall = (appointmentId, personName) => {
    if (isVideoCallCompleted) {
      alert('Video consultation for this appointment has already been completed.');
      return;
    }
    
    if (!isPaid) {
      alert('Payment is required before starting video consultation');
      return;
    }
    
    setShowVideoCall(true);
    onVideoCall && onVideoCall(appointmentId, personName);
  };

  const handleVideoCallEnd = () => {
    setShowVideoCall(false);
  };

  const handleViewAppointment = () => {
    navigate(`/doctor/appoinment-detail/${appointmentId}`);
  };

  if (showVideoCall) {
    return (
      <VideoCall
        appointmentId={appointmentId}
        doctorName={appointment.doctorName || 'Doctor'}
        patientName={appointment.patientName || 'Patient'}
        userRole={userRole}
        userId={appointment.patientId || appointment.doctorId || 'user'}
        onCallEnd={handleVideoCallEnd}
      />
    );
  }
    
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <ProfileSection 
            personInfo={personInfo} 
            userRole={userRole} 
          />
          
          <AppointmentDetails 
            appointment={appointment}
            personInfo={personInfo}
            isVideoCallCompleted={isVideoCallCompleted}
          />
          
          <ActionButtons
            appointment={appointment}
            userRole={userRole}
            isPaid={isPaid}
            isVideoCallCompleted={isVideoCallCompleted}
            appointmentId={appointmentId}
            onPayment={onPayment}
            onVideoCall={handleVideoCall}
            onViewAppointment={handleViewAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;