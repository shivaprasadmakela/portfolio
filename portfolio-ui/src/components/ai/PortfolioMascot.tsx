import React, { useState } from 'react';

export type MascotState = 'listening' | 'thinking' | 'success' | 'error';

interface PortfolioMascotProps {
  state?: MascotState;
  size?: number;
}

export const PortfolioMascot: React.FC<PortfolioMascotProps> = ({ 
  state: externalState, 
  size = 200 
}) => {
  // Internal state handling just for fallback/testing demonstration
  const [internalState] = useState<MascotState>('listening');
  const currentState = externalState || internalState;

  // Get active color code based on state (pure CSS colors)
  const getMascotColor = () => {
    switch (currentState) {
      case 'success': return '#10b981'; // Emerald-500
      case 'error': return '#f43f5e';   // Rose-500
      case 'thinking': return '#818cf8';  // Indigo-400
      case 'listening':
      default: return '#ffffff';         // Default listening state is white
    }
  };

  const activeColor = getMascotColor();

  // Get border opacity based on state (bold thickness, solid visibility)
  const getBorderOpacity = () => {
    switch (currentState) {
      case 'success': return 1.0;
      case 'error': return 1.0;
      case 'thinking': return 0.9;
      case 'listening':
      default: return 0.85; // Highly visible, bold frame border
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* CSS Keyframe Animations Embedded Directly within the SVG Structure */}
      <style>{`
        @keyframes custom-boil {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-1.2px, 0.8px) scale(0.995); }
          66% { transform: translate(1.2px, -0.8px) scale(1.003); }
        }
        @keyframes custom-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes custom-casual-turn {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          20% { transform: rotate(4deg) translateX(1.5px); }
          40% { transform: rotate(-4deg) translateX(-1.5px); }
          60% { transform: rotate(2.5deg) translateX(0.8px); }
          80% { transform: rotate(-2.5deg) translateX(-0.8px); }
        }
        @keyframes custom-think-cycle {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(3deg) translateY(-4px); }
          75% { transform: rotate(-3deg) translateY(2px); }
        }
        @keyframes custom-glitch-error {
          0%, 100% { transform: translate(0, 0) skewX(0deg); }
          20% { transform: translate(-3px, 1.5px) skewX(-4deg); }
          40% { transform: translate(3px, -1.5px) skewX(4deg); }
          60% { transform: translate(-1.5px, -1.5px) skewX(0deg); }
          80% { transform: translate(1.5px, 3px) skewX(2deg); }
        }
        @keyframes custom-pulse-fast {
          0%, 100% { opacity: 0.3; stroke-width: 3px; }
          50% { opacity: 1; stroke-width: 4px; }
        }
        
        /* Organic breathing & smiling/sighing mouth animation */
        @keyframes custom-breath-mouth {
          0%, 100% { transform: scale(1) translateY(0); }
          /* Slow expansion / breathing sigh */
          25% { transform: scale(1.12, 0.88) translateY(1px); }
          50% { transform: scale(0.98, 1.02) translateY(-0.3px); }
          /* Gentle responsive smile widening */
          75% { transform: scale(1.15, 0.85) translateY(1.2px); }
        }
        
        /* Eye Blinking & Looking around behavior for the Idle state */
        @keyframes custom-eye-behavior {
          0%, 15% { transform: translate(0px, 0px) scaleY(1); }
          17% { transform: translate(0px, 0px) scaleY(0.1); }
          19% { transform: translate(0px, 0px) scaleY(1); }
          19-30% { transform: translate(0px, 0px) scaleY(1); }
          32%, 48% { transform: translate(-2.5px, 0px) scaleY(1); } /* Look Left */
          50% { transform: translate(-2.5px, 0px) scaleY(0.1); }   /* Blink while looking left */
          52% { transform: translate(-2.5px, 0px) scaleY(1); }
          52-65% { transform: translate(-2.5px, 0px) scaleY(1); }
          67%, 80% { transform: translate(2.5px, -1px) scaleY(1); }  /* Look Right */
          82% { transform: translate(0px, 0px) scaleY(0.1); }       /* Return center & blink */
          84% { transform: translate(0px, 0px) scaleY(1); }
          100% { transform: translate(0px, 0px) scaleY(1); }
        }

        /* 360-degree Victory Spin on Success state */
        @keyframes custom-spin-success {
          0% { transform: rotate(0deg) scale(1); }
          40% { transform: rotate(180deg) scale(1.12); }
          80% { transform: rotate(360deg) scale(1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        /* Periodic Cartoonish Jump/Hop for the Idle state */
        @keyframes custom-idle-jump {
          0%, 75%, 100% { transform: translateY(0px) scaleY(1) scaleX(1); }
          /* Squish down in preparation */
          78% { transform: translateY(2px) scaleY(0.82) scaleX(1.15); }
          /* Jump up! */
          82% { transform: translateY(-24px) scaleY(1.15) scaleX(0.85); }
          /* Floating at the peak */
          86% { transform: translateY(-26px) scaleY(1.02) scaleX(0.98); }
          /* Landing squish */
          90% { transform: translateY(0px) scaleY(0.8) scaleX(1.2); }
          /* Bounce up slightly */
          94% { transform: translateY(-4px) scaleY(1.05) scaleX(0.95); }
          /* Settle back down */
          97% { transform: translateY(0px) scaleY(1) scaleX(1); }
        }

        .anim-base { 
          animation: custom-boil 0.4s infinite linear; 
          transform-origin: center; 
        }
        .state-listening { 
          animation: custom-idle-jump 8s ease-in-out infinite; 
          transform-origin: center bottom;
        }
        .state-listening .mascot-body-group {
          animation: custom-float 4s ease-in-out infinite, custom-casual-turn 7s ease-in-out infinite; 
          transform-origin: center;
        }
        .state-thinking .mascot-body-group { 
          animation: custom-think-cycle 1.5s ease-in-out infinite; 
          transform-origin: center;
        }
        .state-error .mascot-body-group { 
          animation: custom-glitch-error 0.3s infinite steps(2); 
          transform-origin: center;
        }
        .state-success .mascot-body-group { 
          animation: custom-spin-success 1.3s cubic-bezier(0.25, 1, 0.5, 1) 1; 
          transform-origin: center;
        }

        .eye-l, .eye-r {
          transform-box: fill-box;
          transform-origin: center;
        }
        
        .state-listening .eye-l, .state-listening .eye-r {
          animation: custom-eye-behavior 9s infinite ease-in-out;
        }

        .mouth-anim {
          transform-box: fill-box;
          transform-origin: center;
          animation: custom-breath-mouth 6.5s infinite ease-in-out;
        }
      `}</style>

      {/* The Mascot SVG Canvas */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: activeColor,
          transition: 'all 0.5s ease-in-out'
        }}
        className={`
          ${currentState === 'listening' ? 'state-listening' : ''}
          ${currentState === 'thinking' ? 'state-thinking' : ''}
          ${currentState === 'error' ? 'state-error' : ''}
          ${currentState === 'success' ? 'state-success' : ''}
        `}
      >
        {/* Ambient Halo Ring behind the mascot - Only active during processing cycles */}
        {currentState === 'thinking' && (
          <path
            d="M 25,50 C 25,15 175,15 175,50 C 175,140 185,185 100,185 C 15,185 25,140 25,50 Z"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            strokeLinecap="round"
            style={{ 
              opacity: 0.7,
              animation: 'custom-pulse-fast 1s infinite ease-in-out' 
            }}
          />
        )}

        <g className="mascot-body-group" style={{ transition: 'all 0.5s ease-in-out' }}>
          {/* LEGS */}
          <path
            d="M 80,172 L 80,192 L 70,192"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'all 0.5s ease-in-out' }}
          />
          <path
            d="M 120,172 L 120,192 L 130,192"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'all 0.5s ease-in-out' }}
          />

          {/* Outer Frame - A sleek, rounded bold terminal face border */}
          <path
            d="M 40,50 C 40,35 55,30 100,30 C 145,30 160,35 160,50 C 160,110 165,150 145,165 C 125,180 75,180 55,165 C 35,150 40,110 40,50 Z"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="anim-base"
            style={{ 
              opacity: getBorderOpacity(),
              transition: 'all 0.5s ease-in-out' 
            }}
          />

          {/* Dynamic Inner Features Group (Eyes, Brows, Expression Lines) */}
          <g style={{ transition: 'all 0.5s ease-in-out' }}>
            
            {/* LEFT EYE & BROW */}
            {currentState === 'error' ? (
              <>
                <path d="M 65,75 L 77,87 M 77,75 L 65,87" strokeWidth="4" strokeLinecap="round" />
                <path d="M 62,65 C 68,69 74,69 80,64" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : currentState === 'thinking' ? (
              <>
                <path d="M 66,85 C 70,81 76,81 80,85" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 64,68 C 70,64 76,66 82,72" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : currentState === 'success' ? (
              <>
                <path d="M 64,82 C 68,87 76,87 80,82" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 63,64 C 70,60 77,63 83,67" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="72" cy="84" r="4.5" fill="currentColor" stroke="none" className="eye-l" />
                <path d="M 65,68 C 70,66 76,68 81,72" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* RIGHT EYE & BROW */}
            {currentState === 'error' ? (
              <>
                <path d="M 123,75 L 135,87 M 135,75 L 123,87" strokeWidth="4" strokeLinecap="round" />
                <path d="M 120,64 C 126,69 132,69 138,65" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : currentState === 'thinking' ? (
              <>
                <path d="M 120,85 C 124,81 130,81 134,85" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 118,72 C 124,66 130,64 136,68" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : currentState === 'success' ? (
              <>
                <path d="M 120,82 C 124,87 132,87 136,82" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 117,67 C 123,63 130,60 137,64" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="128" cy="84" r="4.5" fill="currentColor" stroke="none" className="eye-r" />
                <path d="M 119,72 C 124,68 130,66 135,68" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* EXPRESSION MOUTH / INTERACTION LINES */}
            {currentState === 'error' ? (
              <path d="M 80,128 Q 90,120 100,128 T 120,124" strokeWidth="4.5" strokeLinecap="round" />
            ) : currentState === 'thinking' ? (
              <path d="M 92,125 L 108,125" strokeWidth="4" strokeLinecap="round" />
            ) : currentState === 'success' ? (
              <path d="M 76,118 C 84,136 116,136 124,118" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              // Idle State: Smiling and giggling mouth
              <path d="M 80,120 C 90,132 110,132 120,120" strokeWidth="3.8" strokeLinecap="round" className="mouth-anim" />
            )}

            {/* Abstract accent spark detail for Success State */}
            {currentState === 'success' && (
              <path d="M 152,45 L 158,37 M 162,53 L 171,51" strokeWidth="3" strokeLinecap="round" />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
