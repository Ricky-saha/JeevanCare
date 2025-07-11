// src/pages/patient/PatientAppointments.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientBookings } from '../../../Services/Operations/patientApi';
import { addCompletedVideoCall } from '../../../redux/slices/patientSlice';
import { capturePayment, getRazorpayKey, verifyPayment } from '../../../Services/Operations/paymentApi';
import AppointmentList from '../../components/PatientDoctor/AppoinmentList';
import VideoCall from '../../components/VideoCall/VideoCall';
import { toast } from 'react-hot-toast';

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const [currentVideoCall, setCurrentVideoCall] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  const { user } = useSelector((state) => state.auth);
  const { appointments, loading, error, completedVideoCalls } = useSelector((state) => state.patient);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getPatientBookings(user.id));
    }
  }, [dispatch, user]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

const handlePayment = async (appointmentId) => {
  if (paymentLoading) return;
  
  setPaymentLoading(true);
  
  try {
    console.log('Starting payment for appointment:', appointmentId);
    
    // Check if user is logged in
    const token = localStorage.getItem('jeevancare_token'); // Your exact token name
    if (!token) {
      toast.error('Please login to make payment');
      setPaymentLoading(false);
      return;
    }
    
    // Step 1: Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway. Please try again.');
      setPaymentLoading(false);
      return;
    }

    // Step 2: Capture Payment (Create Order)
    console.log('Creating payment order...');
    const captureResult = await capturePayment([appointmentId]);
    
    if (!captureResult.success) {
      console.error('Capture payment failed:', captureResult);
      setPaymentLoading(false);
      return;
    }

    // Step 3: Get Razorpay Key
    console.log('Getting Razorpay key...');
    const keyResult = await getRazorpayKey();
    
    if (!keyResult.success) {
      console.error('Get Razorpay key failed:', keyResult);
      setPaymentLoading(false);
      return;
    }

    // Step 4: Open Razorpay Payment Gateway
    console.log('Opening Razorpay payment gateway...');
    console.log('Payment data:', {
      amount: captureResult.data.amount,
      orderId: captureResult.data.orderId,
      key: keyResult.key
    });

    const options = {
      key: keyResult.key,
      amount: captureResult.data.amount * 100, // Convert to paise
      currency: captureResult.data.currency || 'INR',
      name: 'JeevanCare',
      description: 'Appointment Payment',
      order_id: captureResult.data.orderId,
      handler: async (response) => {
        console.log('Payment successful, verifying...', response);
        
        try {
          // Step 5: Verify Payment
          const verifyResult = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            appointments: [appointmentId]
          });
          
          if (verifyResult.success) {
            // Step 6: Refresh appointments to show updated payment status
            console.log('Payment verified! Refreshing appointments...');
            dispatch(getPatientBookings(user.id));
            toast.success('Payment completed successfully!');
          } else {
            console.error('Payment verification failed:', verifyResult);
          }
        } catch (verifyError) {
          console.error('Error during payment verification:', verifyError);
          toast.error('Payment verification failed. Please contact support.');
        }
        
        setPaymentLoading(false);
      },
      prefill: {
        name: user.name || user.firstName || '',
        email: user.email || '',
        contact: user.phone || user.phoneNumber || ''
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled by user');
          toast.error('Payment cancelled');
          setPaymentLoading(false);
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment process failed:', error);
    toast.error(`Payment process failed: ${error.message}`);
    setPaymentLoading(false);
  }
};

  const handleVideoCall = (appointmentId, doctorName) => {
    // Find the appointment
    const appointment = appointments.find(apt => 
      (apt.appointmentId || apt.id) === appointmentId
    );
    
    if (!appointment) {
      alert('Appointment not found');
      return;
    }
    
    // Check if video call already completed
    if (completedVideoCalls.includes(appointmentId)) {
      alert('Video consultation for this appointment has already been completed.');
      return;
    }
    
    // Check payment status
    const isPaid = appointment.paymentStatus === 'paid' ||
                   appointment.paymentStatus === 'Paid' ||
                   appointment.isPaid;
    
    if (!isPaid) {
      alert('Please complete payment before starting video consultation');
      return;
    }
    
    // Start video call
    setCurrentVideoCall({
      appointmentId,
      doctorName: doctorName || appointment.doctorName || 'Doctor',
      patientName: user.name || user.firstName || 'Patient',
      userRole: 'patient',
      userId: user.id || user._id
    });
  };

  const handleCallEnd = () => {
    if (currentVideoCall) {
      // Mark video call as completed in Redux store
      dispatch(addCompletedVideoCall(currentVideoCall.appointmentId));
    }
    setCurrentVideoCall(null);
  };

  // Show video call if active
  if (currentVideoCall) {
    return (
      <VideoCall
        appointmentId={currentVideoCall.appointmentId}
        doctorName={currentVideoCall.doctorName}
        patientName={currentVideoCall.patientName}
        userRole={currentVideoCall.userRole}
        userId={currentVideoCall.userId}
        onCallEnd={handleCallEnd}
      />
    );
  }

  return (
    <AppointmentList
      appointments={appointments}
      loading={loading}
      error={error}
      userRole="Patient"
      title="My Appointments"
      emptyMessage="You haven't booked any appointments yet."
      showBookButton={true}
      onPayment={handlePayment}
      onVideoCall={handleVideoCall}
      paymentLoading={paymentLoading}
      completedVideoCalls={completedVideoCalls}
    />
  );
};

export default PatientAppointments;