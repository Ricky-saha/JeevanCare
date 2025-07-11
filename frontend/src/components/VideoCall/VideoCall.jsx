// src/components/VideoCall/VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCall = ({ 
  appointmentId, 
  doctorName, 
  patientName, 
  userRole, 
  userId,
  onCallEnd 
}) => {
  const meetingRef = useRef(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  // ZegoCloud Configuration
  const APP_ID = parseInt(import.meta.env.VITE_ZEGO_APP_ID);
  const SERVER_SECRET = import.meta.env.VITE_ZEGO_SERVER_SECRET;
  
  useEffect(() => {
    const initMeeting = async () => {
      try {
        // Validate configuration
        if (!APP_ID || !SERVER_SECRET) {
          console.error('ZegoCloud configuration missing');
          alert('Video calling is not properly configured. Please contact support.');
          return;
        }

        // Generate unique room ID and user ID
        const roomID = `jeevancare_apt_${appointmentId}`;
        const userID = `${userRole}_${userId}_${Date.now()}`;
        const userName = userRole === 'doctor' ? `Dr. ${doctorName}` : patientName;

        // Generate Kit Token (Client-side for ZegoCloud)
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          APP_ID,
          SERVER_SECRET,
          roomID,
          userID,
          userName
        );

        // Create ZegoCloud instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join room with configuration
        zp.joinRoom({
          container: meetingRef.current,
          
          // Scenario for 1-on-1 video call
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          
          // Configuration
          config: {
            // Basic features
            showScreenSharingButton: import.meta.env.VITE_SCREEN_SHARE_ENABLED === 'true',
            showTextChat: import.meta.env.VITE_TEXT_CHAT_ENABLED === 'true',
            showRecordingButton: import.meta.env.VITE_CALL_RECORDING_ENABLED === 'true' && userRole === 'doctor',
            
            // UI settings
            showUserList: false,
            showRemoveUserButton: false,
            showPinButton: false,
            showLeavingView: true,
            showRoomDetailsButton: false,
            
            // Layout
            layout: 'Auto',
            maxUsers: 2,
            
            // Camera/Mic defaults
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            useFrontFacingCamera: true,
            
            // Branding
            branding: {
              logoURL: '/logo.png', // Your JeevanCare logo
            },
            
            // Callbacks
            onLeaveRoom: () => {
              console.log('User left the room');
              setIsCallActive(false);
              setCallDuration(0);
              onCallEnd && onCallEnd();
            },
            
            onUserJoin: (users) => {
              console.log('Users joined:', users);
              setIsCallActive(true);
            },
            
            onUserLeave: (users) => {
              console.log('Users left:', users);
              if (users.length === 0) {
                setIsCallActive(false);
              }
            }
          }
        });

      } catch (error) {
        console.error('ZegoCloud initialization error:', error);
        alert('Failed to initialize video call. Please try again.');
        onCallEnd && onCallEnd();
      }
    };

    if (meetingRef.current) {
      initMeeting();
    }

    // Cleanup
    return () => {
      console.log('VideoCall component unmounting');
    };
  }, [appointmentId, userId, userRole, doctorName, patientName, onCallEnd]);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Custom Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white flex-shrink-0">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-xl font-bold">JeevanCare Video Consultation</h2>
            <p className="text-blue-100 text-sm">
              {userRole === 'doctor' 
                ? `Consultation with ${patientName}` 
                : `Consultation with Dr. ${doctorName}`
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Call Duration */}
            {isCallActive && (
              <div className="bg-black bg-opacity-30 px-3 py-1 rounded-full">
                <span className="text-sm font-mono">{formatDuration(callDuration)}</span>
              </div>
            )}
            
            {/* Appointment ID */}
            <div className="bg-black bg-opacity-30 px-3 py-1 rounded-full">
              <span className="text-sm">Appointment: {appointmentId}</span>
            </div>
            
            {/* Manual End Call Button */}
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to end the call?')) {
                  onCallEnd && onCallEnd();
                }
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      </div>

      {/* ZegoCloud Video Container */}
      <div 
        ref={meetingRef} 
        className="flex-1"
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: '#1a1a1a'
        }}
      />
      
      {/* Footer Instructions */}
      <div className="bg-gray-900 text-white p-3 text-center text-sm flex-shrink-0">
        <p>
          💡 <strong>JeevanCare Video Consultation:</strong> 
          Use controls at bottom • Click screen share for documents • 
          Use chat for messages • Recording available for doctors
        </p>
      </div>
    </div>
  );
};

export default VideoCall;