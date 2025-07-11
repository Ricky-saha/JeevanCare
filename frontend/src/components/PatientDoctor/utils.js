// components/AppointmentCard/utils.js

export const getPaymentStatus = (appointment) => {
  return appointment.paymentStatus === 'paid' || 
         appointment.paymentStatus === 'Paid' || 
         appointment.isPaid || 
         false;
};

export const getPersonInfo = (appointment, userRole) => {
  if (userRole === 'Patient') {
    return {
      name: appointment.doctorName || 'Doctor Name',
      speciality: appointment.speciality || 'Speciality',
      image: appointment.doctorImage || '/default-doctor.png',
      additionalInfo: appointment.fees ? `Fees: ₹${appointment.fees}` : ''
    };
  } else {
    return {
      name: appointment.patientName || 'Patient Name',
      speciality: `Phone: ${appointment.patientPhone || 'Not available'}`,
      image: appointment.patientImage || '/default-patient.png',
      additionalInfo: appointment.fees ? `Fees: ₹${appointment.fees}` : ''
    };
  }
};