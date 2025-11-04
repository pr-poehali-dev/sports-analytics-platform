import { useEffect, useState } from 'react';

const FootballPlayer = () => {
  const [position, setPosition] = useState(0);
  const [kickPhase, setKickPhase] = useState(0);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);

    const kickInterval = setInterval(() => {
      setKickPhase((prev) => (prev + 1) % 4);
    }, 300);

    return () => {
      clearInterval(moveInterval);
      clearInterval(kickInterval);
    };
  }, []);

  const legRotation = kickPhase === 1 ? -30 : kickPhase === 2 ? 30 : 0;
  const ballY = kickPhase === 2 ? -20 : 0;

  return (
    <div 
      className="absolute top-1/2 -translate-y-1/2 transition-all duration-100"
      style={{ left: `${position}%` }}
    >
      <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
        <circle cx="30" cy="15" r="12" fill="#FFD700" stroke="#FF6B00" strokeWidth="2" />
        
        <ellipse cx="27" cy="13" rx="2" ry="3" fill="#000" />
        <ellipse cx="33" cy="13" rx="2" ry="3" fill="#000" />
        
        <path d="M 25 18 Q 30 20 35 18" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        <rect x="22" y="27" width="16" height="22" rx="3" fill="#0066FF" stroke="#003399" strokeWidth="2" />
        
        <line x1="30" y1="27" x2="25" y2="42" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="27" x2="35" y2="42" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
        
        <g transform={`rotate(${kickPhase === 0 ? 0 : legRotation}, 25, 49)`}>
          <line x1="25" y1="49" x2="25" y2="65" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="25" cy="68" rx="4" ry="6" fill="#FF0000" />
        </g>
        
        <line x1="35" y1="49" x2="35" y2="65" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="35" cy="68" rx="4" ry="6" fill="#FF0000" />
      </svg>
      
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        className="absolute transition-all duration-200"
        style={{ 
          left: '50px',
          top: `${30 + ballY}px`
        }}
      >
        <circle cx="10" cy="10" r="9" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
        <path d="M 10 2 L 12 8 L 18 8 L 13 12 L 15 18 L 10 14 L 5 18 L 7 12 L 2 8 L 8 8 Z" fill="#000" />
      </svg>
    </div>
  );
};

export default FootballPlayer;
