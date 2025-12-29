
import React from 'react';
import { AppMode, SynthParams } from '../types';

interface DisplayProps {
  mode: AppMode;
  params: SynthParams;
  tapeSpeed: number;
}

const Display: React.FC<DisplayProps> = ({ mode, params, tapeSpeed }) => {
  const renderVisualizer = () => {
    switch (mode) {
      case AppMode.SYNTH:
        return (
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
            <g stroke="#ffffff" fill="none" strokeWidth="0.5" opacity="0.2">
              <line x1="0" y1="100" x2="400" y2="100" />
              <line x1="200" y1="0" x2="200" y2="200" />
            </g>
            <path 
              d={`M 50 100 Q 125 ${100 - params.blue} 200 100 T 350 100`}
              fill="none"
              stroke="#4fbefd"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <circle 
              cx={200 + (params.green - 50) * 2} 
              cy={100 + (params.red - 50)} 
              r={Math.max(5, params.white / 2)} 
              stroke="#24d982" 
              strokeWidth="1.5"
              fill="#24d982"
              fillOpacity="0.1"
            />
            <text x="10" y="20" className="fill-[#ffffff] text-[8px] font-mono font-bold tracking-widest">OP-FIELD // SYNTH</text>
            <text x="390" y="190" textAnchor="end" className="fill-zinc-500 text-[6px] font-mono uppercase">MOD: {params.green}%</text>
          </svg>
        );
      case AppMode.TAPE:
        return (
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Reels */}
            <g opacity="0.4">
               <circle cx="80" cy="100" r="45" stroke="#ffffff" fill="none" strokeWidth="0.5" strokeDasharray="5 5" />
               <circle cx="320" cy="100" r="45" stroke="#ffffff" fill="none" strokeWidth="0.5" strokeDasharray="5 5" />
               <circle cx="80" cy="100" r="8" fill="#ff6d00" />
               <circle cx="320" cy="100" r="8" fill="#ff6d00" />
            </g>
            
            {/* 4 Tracks Visualization */}
            <g transform="translate(100, 60)">
              {[0, 1, 2, 3].map(i => (
                <g key={i} transform={`translate(0, ${i * 25})`}>
                  <rect width="200" height="15" fill="#111" stroke="#333" strokeWidth="0.5" />
                  <line x1="0" y1="7.5" x2="200" y2="7.5" stroke="#222" strokeWidth="0.5" />
                  {/* Faux Waveform */}
                  <path 
                    d={`M 10 7.5 L 30 2 L 50 13 L 70 7.5 L 120 10 L 150 5 L 190 7.5`} 
                    stroke={i % 2 === 0 ? "#4fbefd" : "#24d982"} 
                    fill="none" 
                    strokeWidth="1" 
                    opacity="0.6"
                  />
                </g>
              ))}
            </g>

            {/* Playhead */}
            <line x1="200" y1="40" x2="200" y2="160" stroke="#ff6d00" strokeWidth="1" className="animate-pulse" />
            
            {/* Speed Indicator */}
            <g transform="translate(330, 20)">
               <rect width="60" height="12" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
               <text x="30" y="9" textAnchor="middle" className="fill-white text-[7px] font-mono font-bold tracking-tighter uppercase">SPD: {tapeSpeed}x</text>
            </g>

            <text x="200" y="25" textAnchor="middle" className="fill-[#ff6d00] text-[10px] font-mono font-bold">TAPE TRACKER</text>
            <text x="10" y="190" className="fill-zinc-500 text-[6px] font-mono uppercase">REC.READY</text>
          </svg>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-[#4fbefd] font-mono text-[10px] tracking-widest uppercase">Initializing {mode}...</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderVisualizer()}
    </div>
  );
};

export default Display;
