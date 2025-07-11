// components/AppointmentCard/ActionButtons.jsx
import React from 'react';
import { Eye, Video, CreditCard, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const ActionButtons = ({
  appointment,
  userRole,
  isPaid,
  isVideoCallCompleted,
  appointmentId,
  onPayment,
  onVideoCall,
  onViewAppointment
}) => {
  const status = appointment.status?.toLowerCase();
  const isPatient = userRole === 'Patient';

  // Helper function to render status badge
  const renderStatusBadge = (icon, title, subtitle, bgColor) => (
    <div className={`flex flex-col items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl text-center ${bgColor}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      <span className="text-xs font-normal">{subtitle}</span>
    </div>
  );

  // Handle completed/cancelled status
  if (status === 'completed' || status === 'cancelled') {
    const isCompleted = status === 'completed';
    return (
      <div className="flex flex-col gap-3 w-full lg:w-auto">
        <div className={`flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl text-center transition-all ${
          isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {isCompleted ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {isCompleted ? 'COMPLETED' : 'CANCELLED'}
        </div>
      </div>
    );
  }

  // Handle non-scheduled status
  if (status !== 'scheduled') {
    return (
      <div className="flex flex-col gap-3 w-full lg:w-auto">
        <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 font-semibold py-3 px-6 rounded-xl text-center transition-all">
          <Clock className="w-4 h-4" />
          {appointment.status || 'PENDING'}
        </div>
      </div>
    );
  }

  // Main action buttons for scheduled appointments
  return (
    <div className={`flex flex-col gap-3 w-full lg:w-auto ${isPatient ? 'sm:flex-row lg:flex-col' : ''}`}>
      {/* Doctor's View Appointment button */}
      {!isPatient && (
        <button 
          onClick={onViewAppointment}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Eye className="w-4 h-4" />
          View Appointment
        </button>
      )}

      {/* Payment Status */}
      {isPaid ? 
        renderStatusBadge(
          <CheckCircle className="w-4 h-4" />,
          'PAYMENT CONFIRMED',
          isPatient ? "You're now eligible for video consultation" : "Patient is eligible for video consultation",
          'bg-green-100 text-green-700 border border-green-200'
        ) :
        renderStatusBadge(
          <AlertCircle className="w-4 h-4" />,
          'PAYMENT PENDING',
          isPatient ? "Pay now to get video consultation" : "Waiting for patient payment to enable consultation",
          'bg-red-100 text-red-700 border border-red-200'
        )
      }

      {/* Video Call Button - Show if paid and not completed */}
      {isPaid && !isVideoCallCompleted && (
        <button 
          onClick={() => onVideoCall(appointmentId, isPatient ? appointment.doctorName : appointment.patientName)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Video className="w-4 h-4" />
          {isPatient ? 'Video Call' : 'Start Video Call'}
        </button>
      )}

      {/* Video Call Completed Status */}
      {isPaid && isVideoCallCompleted && 
        renderStatusBadge(
          <CheckCircle className="w-4 h-4" />,
          'CONSULTATION COMPLETED',
          isPatient ? "Video call session has been completed" : "Video consultation has been completed",
          'bg-blue-100 text-blue-700 border border-blue-200'
        )
      }

      {/* Pay Now Button - Only show for patients if not paid */}
      {isPatient && !isPaid && (
        <button 
          onClick={() => onPayment(appointmentId)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 outline-none transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <CreditCard className="w-4 h-4" />
          Pay Now
        </button>
      )}
    </div>
  );
};

export default ActionButtons;