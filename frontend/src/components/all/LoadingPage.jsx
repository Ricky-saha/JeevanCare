import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center z-50">
      <div className="text-center relative">
        
        {/* Floating Medical Icons Background */}
        <div className="absolute -top-20 -left-20 w-8 h-8 text-blue-200 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <div className="absolute -top-10 right-16 w-6 h-6 text-green-200 animate-float" style={{animationDelay: '1s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 8h6v2H4V8zm0 4h6v2H4v-2zm0 4h6v2H4v-2z"/>
          </svg>
        </div>

        {/* Main Heart Loading */}
        <div className="relative mb-8">
          {/* Pulse Rings */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute inset-4 border-2 border-blue-200 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-6 border-2 border-green-200 rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          {/* Heart Container */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Rotating Border */}
            <div className="w-full h-full border-4 border-transparent rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  background: 'conic-gradient(from 0deg, #1e40af, #059669, #1e40af)',
                  padding: '4px',
                  animationDuration: '3s'
                }}
              >
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Animated Heart */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                {/* Heart SVG */}
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  className="heart-beat"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    animation: 'heartBeat 1.5s ease-in-out infinite'
                  }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            
            {/* Floating Heart Particles */}
            <div className="absolute top-0 left-8 text-blue-300 animate-float" style={{animationDelay: '0s'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            <div className="absolute bottom-2 right-6 text-green-300 animate-float" style={{animationDelay: '1s'}}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            <div className="absolute top-4 right-2 text-blue-200 animate-float" style={{animationDelay: '2s'}}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Enhanced Heartbeat Monitor */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-lg p-4 mx-auto w-80 relative overflow-hidden">
            {/* Monitor Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-20 grid-rows-8 h-full w-full">
                {Array.from({length: 160}).map((_, i) => (
                  <div key={i} className="border-r border-b border-green-800"></div>
                ))}
              </div>
            </div>
            
            {/* Animated Heartbeat Line */}
            <div className="relative h-16 flex items-center overflow-hidden">
              <svg width="100%" height="64" viewBox="0 0 320 64" className="relative z-10">
                <defs>
                  <linearGradient id="heartbeat" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0"/>
                    <stop offset="50%" stopColor="#10B981" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Moving Heartbeat Line */}
                <g className="heartbeat-line">
                  <path
                    d="M-50,32 L-10,32 L-5,10 L0,54 L5,20 L10,44 L15,32 L370,32"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    fill="none"
                    className="animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 3px #10B981)',
                      animation: 'moveHeartbeat 3s linear infinite'
                    }}
                  />
                  
                  {/* Trail effect */}
                  <path
                    d="M-50,32 L-10,32 L-5,10 L0,54 L5,20 L10,44 L15,32 L370,32"
                    stroke="#10B981"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    style={{
                      animation: 'moveHeartbeat 3s linear infinite',
                      animationDelay: '0.1s'
                    }}
                  />
                </g>
                
                {/* Scanning line */}
                <line
                  x1="0" y1="0" x2="0" y2="64"
                  stroke="#22C55E"
                  strokeWidth="1"
                  opacity="0.8"
                  style={{
                    filter: 'drop-shadow(0 0 5px #22C55E)',
                    animation: 'scanLine 2s linear infinite'
                  }}
                />
              </svg>
            </div>
            
            {/* Heart Rate Display */}
            <div className="text-green-400 text-xs font-mono text-right">
              <span className="animate-pulse">♥ 72 BPM</span>
            </div>
          </div>
        </div>

        {/* Loading Text with Medical Typography */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent">
              Jeevan Care
            </span>
          </h2>
          <p className="text-gray-500 text-sm mb-4">Your life, our care 💙</p>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>

        {/* Status Text */}
        <p className="text-gray-600 text-sm animate-pulse">
          Preparing your healthcare dashboard...
        </p>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1.05); }
          75% { transform: scale(1.15); }
        }
        
        @keyframes moveHeartbeat {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
        
        @keyframes scanLine {
          0% { transform: translateX(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(320px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .heart-beat {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        .heartbeat-line {
          animation: moveHeartbeat 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;