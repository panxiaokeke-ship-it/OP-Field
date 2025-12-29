
import React, { useState, useEffect, useRef } from 'react';

interface KnobProps {
  label: string;
  value: number;
  color: string;
  onChange: (val: number) => void;
}

const Knob: React.FC<KnobProps> = ({ label, value, color, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startY.current = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    startValue.current = value;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const delta = startY.current - currentY;
      const newValue = Math.min(100, Math.max(0, startValue.current + delta / 1.5));
      onChange(newValue);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, onChange]);

  const rotation = (value / 100) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-0.5 md:gap-1">
      <div 
        className="relative w-8 h-8 md:w-14 md:h-14 rounded-full bg-zinc-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.2)] cursor-pointer flex items-center justify-center border border-zinc-300 active:scale-95 transition-transform touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* The Colored Indicator Groove */}
        <div 
          className="w-[12%] h-[40%] rounded-full absolute top-[10%] transition-transform origin-[50%_100%]"
          style={{ 
            backgroundColor: color,
            transform: `rotate(${rotation}deg)`,
          }}
        />
        {/* Subtle center cap */}
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-zinc-300 shadow-inner" />
      </div>
      {label && <span className="text-[6px] md:text-[7px] font-black uppercase text-zinc-500 mt-0.5">{label}</span>}
    </div>
  );
};

export default Knob;
