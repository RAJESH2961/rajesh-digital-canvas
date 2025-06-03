
import React from 'react';

const ThreeScene = () => {
  return (
    <div className="w-32 h-32 mx-auto relative">
      {/* Simple animated sphere fallback */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-pulse shadow-2xl">
        <div className="w-full h-full rounded-full bg-gradient-to-tl from-transparent via-white/20 to-transparent animate-spin" 
             style={{ animationDuration: '3s' }}>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeScene;
