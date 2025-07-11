import React from 'react';

const ErrorPage = ({ error, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center z-50">
      <div className="text-center relative">
        
        {/* Floating Warning Icons Background */}
        <div className="absolute -top-20 -left-20 w-8 h-8 text-red-200 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 3.99L18.53 19H5.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
          </svg>
        </div>
        
        <div className="absolute -top-10 right-16 w-6 h-6 text-orange-200 animate-float" style={{animationDelay: '1s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
        </div>

        {/* Main Error Icon */}
        <div className="relative mb-8">
          {/* Pulse Rings */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute inset-4 border-2 border-red-200 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-6 border-2 border-orange-200 rounded-full animate-ping opacity-30" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          {/* Error Container */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Rotating Border */}
            <div className="w-full h-full border-4 border-transparent rounded-full relative overflow-hidden">
              <div 
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  background: 'conic-gradient(from 0deg, #dc2626, #f97316, #dc2626)',
                  padding: '4px',
                  animationDuration: '3s'
                }}
              >
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Animated Error Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 via-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  className="error-shake"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    animation: 'errorShake 2s ease-in-out infinite'
                  }}
                >
                  <path d="M12 2L1 21h22L12 2zm0 3.99L18.53 19H5.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
                </svg>
              </div>
            </div>
            
            {/* Floating Error Particles */}
            <div className="absolute top-0 left-8 text-red-300 animate-float" style={{animationDelay: '0s'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            
            <div className="absolute bottom-2 right-6 text-orange-300 animate-float" style={{animationDelay: '1s'}}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.99L18.53 19H5.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
              </svg>
            </div>
            
            <div className="absolute top-4 right-2 text-red-200 animate-float" style={{animationDelay: '2s'}}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Error Monitor Display */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-lg p-4 mx-auto w-80 relative overflow-hidden">
            {/* Monitor Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-20 grid-rows-8 h-full w-full">
                {Array.from({length: 160}).map((_, i) => (
                  <div key={i} className="border-r border-b border-red-800"></div>
                ))}
              </div>
            </div>
            
            {/* Animated Error Line */}
            <div className="relative h-16 flex items-center overflow-hidden">
              <svg width="100%" height="64" viewBox="0 0 320 64" className="relative z-10">
                <defs>
                  <linearGradient id="errorLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0"/>
                    <stop offset="50%" stopColor="#EF4444" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Flatline */}
                <g className="error-line">
                  <path
                    d="M0,32 L80,32 L85,10 L90,54 L95,32 L320,32"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                    fill="none"
                    className="animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 3px #EF4444)',
                    }}
                  />
                  
                  {/* Glitch effect */}
                  <path
                    d="M0,32 L80,32 L85,10 L90,54 L95,32 L320,32"
                    stroke="#EF4444"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    style={{
                      animation: 'glitch 1s linear infinite',
                    }}
                  />
                </g>
                
                {/* Error scanning line */}
                <line
                  x1="0" y1="0" x2="0" y2="64"
                  stroke="#F87171"
                  strokeWidth="1"
                  opacity="0.8"
                  style={{
                    filter: 'drop-shadow(0 0 5px #F87171)',
                    animation: 'scanLine 2s linear infinite'
                  }}
                />
              </svg>
            </div>
            
            {/* Error Status Display */}
            <div className="text-red-400 text-xs font-mono text-right">
              <span className="animate-pulse">⚠ CONNECTION LOST</span>
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
              Something went wrong
            </span>
          </h2>
          <p className="text-gray-500 text-sm mb-4">Click on the Try Again Button 🔌</p>
          
          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 mx-auto max-w-md">
            <p className="text-red-700 text-sm font-medium">
              {error || "An unexpected error occurred. Please try again."}
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
          >
            Try Again
          </button>
        )}

        {/* Status Text */}
        <p className="text-gray-600 text-sm animate-pulse">
          try sometime later.....
        </p>
      </div>
      
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes errorShake {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(-2deg); }
          50% { transform: scale(1.1) rotate(2deg); }
          75% { transform: scale(1.05) rotate(-1deg); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translateX(0); opacity: 1; }
          20% { transform: translateX(-2px); opacity: 0.8; }
          40% { transform: translateX(2px); opacity: 0.6; }
          60% { transform: translateX(-1px); opacity: 0.9; }
          80% { transform: translateX(1px); opacity: 0.7; }
        }
        
        @keyframes scanLine {
          0% { transform: translateX(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(320px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .error-shake {
          animation: errorShake 2s ease-in-out infinite;
        }
        
        .error-line {
          animation: glitch 1s linear infinite;
        }
        `
      }} />
    </div>
  );
};

export default ErrorPage;